const fs = require('fs');

// 1) 源 JSON 文件
const jsonFile = 'C:/Users/11/AppData/Local/Temp/ielts_words.json';
const raw = fs.readFileSync(jsonFile, 'utf8');
const src = JSON.parse(raw);
const srcCount = src.chapters.reduce((a,c)=>a+c.words.length,0);

// 2) 嵌入到 index.html 的数据
const h = fs.readFileSync('C:/Users/11/ielts-dictation/index.html', 'utf8');
const start = 'const WORDS = ';
const end = '\n\n// ---------- localStorage';
const i = h.indexOf(start);
const j = h.indexOf(end);
let jsonStr = h.slice(i + start.length, j).trim();
if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1).trim();
const embedded = JSON.parse(jsonStr);
const embCount = embedded.chapters.reduce((a,c)=>a+c.words.length,0);

console.log('源 JSON 文件大小:', raw.length, 'bytes');
console.log('index.html 大小:', h.length, 'bytes');
console.log('源:   ', src.chapters.length, '章节,', srcCount, '词');
console.log('嵌入: ', embedded.chapters.length, '章节,', embCount, '词');
console.log(srcCount === embCount && src.chapters.length === embedded.chapters.length ? '✅ 数据完整一致' : '❌ 数据不一致!');
