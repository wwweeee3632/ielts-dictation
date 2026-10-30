const fs = require('fs');
const template = fs.readFileSync('C:/Users/11/ielts-dictation/template.html', 'utf8');
const words = fs.readFileSync('C:/Users/11/AppData/Local/Temp/ielts_words_final.json', 'utf8');
// escape '<' so no '</script>' or '<!--' can break out of the script tag
const safe = words.replace(/</g, '\\u003c');
if (!template.includes('__WORDS_DATA__')) { console.error('模板中找不到占位符 __WORDS_DATA__'); process.exit(1); }
const html = template.replace('__WORDS_DATA__', safe);
fs.writeFileSync('C:/Users/11/ielts-dictation/index.html', html);
console.log('生成完成: C:/Users/11/ielts-dictation/index.html');
console.log('文件大小:', html.length, 'bytes');
console.log('占位符残留:', html.includes('__WORDS_DATA__') ? '有(错误!)' : '无 ✓');
console.log('包含词条 "bananas":', html.includes('bananas') ? '是 ✓' : '否');
