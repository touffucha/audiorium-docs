// 本文の折れる位置をビルド時に決める。段落は「。」の後で改行して 1 文を 1 行にし、文節の切れ目（BudouX）に <wbr> を入れ、読点までの節を span.clause にまとめる。
// CSS（custom.css）は word-break: keep-all で <wbr> と句読点の後だけで折り、列が広いときは節を inline-block にして読点の後へ寄せる。
import { loadDefaultJapaneseParser } from 'budoux';

// 節の上限は、CSS が inline-block を有効にする最も狭い行（箇条の 40em）に必ず収まる長さ。超える節はまとめず、行末まで流す。
const ClauseMaxEm = 34;
const ClosingBracket = '[」）』]';
const SentenceEnd = new RegExp(`(?<=。)(?!${ClosingBracket})`);
const ClauseEnd = new RegExp(`(?<=、)(?!${ClosingBracket})`);
const NoBreakSpace = ' ';
const CodePlaceholder = 'A';
const parser = loadDefaultJapaneseParser();

export default function lineBreaks() {
  return (tree) => {
    const walk = (node) => {
      if (node.type === 'paragraph') {
        node.children = splitSentences(node.children);
        markPhrases(node);
        node.children = groupClauses(node.children);
      } else if (node.type === 'tableCell') {
        markPhrases(node);
      } else if (node.children) {
        node.children.forEach(walk);
      }
    };
    walk(tree);
  };
}

function splitSentences(nodes) {
  const children = [];
  nodes.forEach((child, index) => {
    if (child.type !== 'text') {
      children.push(child);
      return;
    }
    const parts = child.value.split(SentenceEnd);
    parts.forEach((part, k) => {
      const text = k > 0 ? part.replace(/^\s+/, '') : part;
      if (!text) return;
      children.push({ type: 'text', value: text });
      const more = k < parts.length - 1 || index < nodes.length - 1;
      if (text.endsWith('。') && more) children.push({ type: 'break' });
    });
  });
  return children;
}

function markPhrases(container) {
  const runs = [[]];
  collectLeaves(container, runs);
  const replacements = new Map();
  for (const run of runs) markRun(run, replacements);
  replaceLeaves(container, replacements);
}

function collectLeaves(node, runs) {
  for (const child of node.children) {
    if (child.type === 'text' || child.type === 'inlineCode') runs[runs.length - 1].push(child);
    else if (child.type === 'break' || isImage(child)) runs.push([]);
    else if (child.children) collectLeaves(child, runs);
  }
}

function replaceLeaves(node, replacements) {
  node.children = node.children.flatMap((child) => {
    if (replacements.has(child)) return replacements.get(child);
    if (child.children) replaceLeaves(child, replacements);
    return [child];
  });
}

function markRun(leaves, replacements) {
  const text = leaves.map((leaf) => (leaf.type === 'inlineCode' ? CodePlaceholder : leaf.value)).join('');
  const bounds = phraseBounds(text);
  let start = 0;
  for (const leaf of leaves) {
    if (leaf.type === 'inlineCode') {
      if (bounds.has(start)) replacements.set(leaf, [wordBreak(), leaf]);
      start += CodePlaceholder.length;
      continue;
    }
    const nodes = [];
    let buffer = '';
    const flush = () => {
      if (buffer) nodes.push({ type: 'text', value: buffer });
      buffer = '';
    };
    const breakHere = () => {
      flush();
      if (nodes.length === 0 || nodes[nodes.length - 1].type !== 'wordBreak') nodes.push(wordBreak());
    };
    for (let i = 0; i < leaf.value.length; i++) {
      const at = start + i;
      const ch = leaf.value[i];
      if (bounds.has(at)) breakHere();
      const joinsPhrase = ch === ' ' && (isWide(text[at - 1]) || isWide(text[at + 1])) && !bounds.has(at) && !bounds.has(at + 1) && text[at - 1] !== '›';
      buffer += joinsPhrase ? NoBreakSpace : ch;
      if (ch === '・' && at + 1 < text.length && !bounds.has(at + 1)) breakHere();
    }
    flush();
    replacements.set(leaf, nodes);
    start += leaf.value.length;
  }
}

function phraseBounds(text) {
  const bounds = new Set();
  let at = 0;
  for (const phrase of parser.parse(text)) {
    at += phrase.length;
    const insideWord = /[A-Za-z0-9]/.test(text[at - 1] ?? '') && /[A-Za-z0-9]/.test(text[at] ?? '');
    if (at < text.length && !insideWord) bounds.add(at);
  }
  for (let i = 1; i + 1 < text.length; i++) {
    const beforeParticle = !isWide(text[i - 1]) && isHiragana(text[i + 1]);
    const beforeNumber = isWide(text[i - 1]) && !isHiragana(text[i - 1]) && /[0-9]/.test(text[i + 1]);
    if (text[i] !== ' ' || !(beforeParticle || beforeNumber)) continue;
    bounds.delete(i);
    bounds.delete(i + 1);
  }
  return bounds;
}

function groupClauses(nodes) {
  if (nodes.some(isImage)) return nodes;
  const pieces = nodes.flatMap((node) =>
    node.type === 'text' ? node.value.split(ClauseEnd).map((value) => ({ type: 'text', value })) : [node],
  );
  const children = [];
  let clause = [];
  const close = () => {
    while (clause.length > 0 && clause[0].type === 'wordBreak') children.push(clause.shift());
    if (clause.length === 0) return;
    if (estimateEm(clause) <= ClauseMaxEm) children.push(clauseNode(clause));
    else children.push(...clause);
    clause = [];
  };
  for (const piece of pieces) {
    if (piece.type === 'break') {
      close();
      children.push(piece);
      continue;
    }
    clause.push(piece);
    if (piece.type === 'text' && /[、。]$/.test(piece.value)) close();
  }
  close();
  return children;
}

function wordBreak() {
  return { type: 'wordBreak', data: { hName: 'wbr' } };
}

function clauseNode(children) {
  return { type: 'clause', data: { hName: 'span', hProperties: { className: ['clause'] } }, children };
}

function isImage(node) {
  return node.type === 'image' || (node.type === 'mdxJsxTextElement' && node.name === 'img');
}

function isHiragana(ch) {
  return ch >= 'ぁ' && ch <= 'ゟ';
}

function isWide(ch) {
  return ch !== undefined && ch.codePointAt(0) >= 0x2e80;
}

// 和文は全角 1em、欧文と空白は Jost の平均の字幅。字間 0.02em を含めた、実測より少し長めの見積もり。
function estimateEm(nodes) {
  let em = 0;
  for (const node of nodes) {
    if (node.type === 'inlineCode') em += node.value.length * 0.5 + 0.7;
    else if (typeof node.value === 'string') for (const ch of node.value) em += isWide(ch) ? 1.02 : 0.56;
    else if (node.children) em += estimateEm(node.children);
  }
  return em;
}
