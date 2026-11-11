import fs from 'fs';
import path from 'path';

const Entities = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#x27;': "'", '&#39;': "'", '&nbsp;': ' ' };

function toText(html) {
  return html
    .replace(/<a[^>]*class="[^"]*hash-link[^"]*"[^>]*>[\s\S]*?<\/a>/g, '')
    .replace(/<\/(td|th|li|p)>/g, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z#0-9]+;/gi, (entity) => Entities[entity] ?? '')
    .replace(/[​\s]+/g, ' ')
    .trim();
}

function listHtmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) return listHtmlFiles(full);
    return entry.name.endsWith('.html') ? [full] : [];
  });
}

// ビルドした各ページの本文を見出しごとに分け、サイドバーの検索窓が読む索引（search-index.json）を書き出す
export default function searchIndex() {
  return {
    name: 'search-index',
    async postBuild({ outDir, baseUrl }) {
      const entries = [];
      for (const file of listHtmlFiles(path.join(outDir, 'docs'))) {
        const html = fs.readFileSync(file, 'utf8');
        const article = html.match(/<article[^>]*>([\s\S]*?)<\/article>/)?.[1];
        if (!article) continue;
        const body = article.replace(/<nav[\s\S]*?<\/nav>/g, '').replace(/<button[\s\S]*?<\/button>/g, '');
        const title = toText(body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '');
        const route = path.relative(outDir, file).replace(/\\/g, '/').replace(/(\/index)?\.html$/, '');
        const url = baseUrl + route;
        const parts = body.split(/<h[23][^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/h[23]>/);
        entries.push({ page: title, heading: '', url, text: toText(parts[0].replace(/<h1[\s\S]*?<\/h1>/, '')) });
        for (let i = 1; i < parts.length; i += 3) {
          entries.push({ page: title, heading: toText(parts[i + 1]), url: `${url}#${parts[i]}`, text: toText(parts[i + 2]) });
        }
      }
      fs.writeFileSync(path.join(outDir, 'search-index.json'), JSON.stringify(entries));
    },
  };
}
