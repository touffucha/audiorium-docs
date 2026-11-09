// 段落の中の「。」の後で改行し、1 文を 1 行にする。1 行に収まらない文は、CSS の text-wrap: balance で文節の切れ目に折れる。
// 42em の列に複数の文を流すと、行末が文の途中（「スピーカーが／置かれています」など）に来るため。
export default function sentenceBreaks() {
  return (tree) => {
    const walk = (node) => {
      if (node.type === 'paragraph') splitParagraph(node);
      else if (node.children) node.children.forEach(walk);
    };
    walk(tree);
  };
}

function splitParagraph(paragraph) {
  const children = [];
  paragraph.children.forEach((child, index) => {
    if (child.type !== 'text') {
      children.push(child);
      return;
    }
    const parts = child.value.split(/(?<=。)/);
    parts.forEach((part, k) => {
      const text = k > 0 ? part.replace(/^\s+/, '') : part;
      if (!text) return;
      children.push({ type: 'text', value: text });
      const more = k < parts.length - 1 || index < paragraph.children.length - 1;
      if (text.endsWith('。') && more) children.push({ type: 'break' });
    });
  });
  paragraph.children = children;
}
