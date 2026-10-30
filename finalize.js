const fs = require('fs');
const data = JSON.parse(fs.readFileSync('C:/Users/11/AppData/Local/Temp/ielts_words.json', 'utf8'));
const map = JSON.parse(fs.readFileSync('C:/Users/11/ielts-dictation/audio_map.json', 'utf8'));
function norm(s){ return String(s||'').trim().toLowerCase().replace(/\s+/g,' ').replace(/[’‘`´]/g,"'"); }
let miss = 0;
for (const ch of data.chapters) {
  for (const w of ch.words) {
    const k = norm(w.w);
    if (k in map) w.a = map[k] + '.mp3';
    else { w.a = null; miss++; }
  }
}
fs.writeFileSync('C:/Users/11/AppData/Local/Temp/ielts_words_final.json', JSON.stringify(data));
console.log('final JSON 完成, 大小:', fs.statSync('C:/Users/11/AppData/Local/Temp/ielts_words_final.json').size, 'bytes');
console.log('缺少音频映射的词条数:', miss);
