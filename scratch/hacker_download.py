import subprocess
import os

with open('socks5.txt', 'r') as f:
    proxies = [line.strip() for line in f.readlines() if line.strip()]

video_url = "https://www.youtube.com/watch?v=fu4p96ca5H4"
print(f"Total proxies to try: {len(proxies)}")

for p in proxies[:50]:
    print(f"Trying proxy: {p}")
    cmd = [
        "~/.local/bin/yt-dlp",
        "--proxy", f"socks5://{p}",
        "--write-auto-subs",
        "--sub-langs", "en",
        "--skip-download",
        video_url
    ]
    # Expand ~
    cmd[0] = os.path.expanduser(cmd[0])
    
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode == 0:
        print("SUCCESS with proxy", p)
        print(result.stdout)
        break
    else:
        print("FAILED")
