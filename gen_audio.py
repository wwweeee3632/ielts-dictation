import asyncio, sys, os
import edge_tts

VOICE = "en-GB-SoniaNeural"   # 英音女声，清晰
RATE = "+0%"                  # 自然语速

async def gen(word, idx, out_dir, sem, failures):
    async with sem:
        path = os.path.join(out_dir, f"{idx}.mp3")
        if os.path.exists(path) and os.path.getsize(path) > 0:
            return
        try:
            tts = edge_tts.Communicate(word, VOICE, rate=RATE)
            await tts.save(path)
        except Exception as e:
            failures.append((idx, word, str(e)))

async def main():
    words_file = sys.argv[1]
    out_dir = sys.argv[2]
    os.makedirs(out_dir, exist_ok=True)
    with open(words_file, encoding='utf-8') as f:
        words = [ln.rstrip('\r\n') for ln in f if ln.strip()]
    failures = []
    sem = asyncio.Semaphore(16)
    tasks = [gen(w, i, out_dir, sem, failures) for i, w in enumerate(words)]
    # 分批跑，便于看进度
    for done_i in range(0, len(tasks), 100):
        batch = tasks[done_i:done_i+100]
        await asyncio.gather(*batch)
        print(f"进度 {min(done_i+100, len(tasks))}/{len(tasks)}", flush=True)
    ok = len(words) - len(failures)
    print(f"\n完成 {ok}/{len(words)}")
    if failures:
        print("失败项:")
        for idx, w, e in failures:
            print(f"  {idx}: {w!r} -> {e}")

if __name__ == '__main__':
    asyncio.run(main())
