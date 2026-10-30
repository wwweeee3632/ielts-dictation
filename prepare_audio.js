const fs = require('fs');
const data = JSON.parse(fs.readFileSync('C:/Users/11/AppData/Local/Temp/ielts_words.json', 'utf8'));
function norm(s){ return String(s||'').trim().toLowerCase().replace(/\s+/g,' ').replace(/[’‘`´]/g,"'"); }
const map = {};       // 规范化词 -> 序号
const order = [];     // 序号 -> 原始词
for (const ch of data.chapters) {
  for (const w of ch.words) {
    const k = norm(w.w);
    if (!(k in map)) { map[k] = order.length; order.push(w.w); }
  }
}
fs.writeFileSync('C:/Users/11/ielts-dictation/audio_words.txt', order.map(w => w.replace(/[\r\n]/g, ' ')).join('\n'), 'utf8');
fs.writeFileSync('C:/Users/11/ielts-dictation/audio_map.json', JSON.stringify(map), 'utf8');
const total = data.chapters.reduce((a,c)=>a+c.words.length,0);
console.log('总词数:', total);
console.log('唯一词数:', order.length);
console.log('已写入 audio_words.txt / audio_map.json');
