import json
from youtube_transcript_api import YouTubeTranscriptApi

api = YouTubeTranscriptApi()
raw_cues = api.fetch('iG9CE55wbtY')
print(f"Fetched {len(raw_cues)} cues for TEDx.")

import urllib.parse
import urllib.request

def translate_batch(texts):
    if not texts:
        return []
    joined = "\n___\n".join(texts)
    try:
        url = f"https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q={urllib.parse.quote(joined)}"
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=8) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            translated_joined = "".join([part[0] for part in data[0] if part[0]])
            results = [t.strip() for t in translated_joined.split("___")]
            if len(results) == len(texts):
                return results
    except Exception as e:
        print("Translate err:", e)
    return texts

ted_list = []
en_texts = []
for idx, cue in enumerate(raw_cues):
    t_en = cue.text.replace("\n", " ").strip()
    if not t_en:
        continue
    start = round(float(cue.start), 2)
    duration = round(float(cue.duration), 2)
    end = round(start + duration, 2)
    words = [w for w in t_en.split() if w]
    ted_list.append({
        "id": idx + 1,
        "start": start,
        "duration": duration,
        "end": end,
        "textEn": t_en,
        "textVi": t_en,
        "words": words
    })
    en_texts.append(t_en)

# Batch translate in chunks of 30
chunk_size = 30
for i in range(0, len(ted_list), chunk_size):
    chunk_texts = en_texts[i:i+chunk_size]
    translated = translate_batch(chunk_texts)
    for j, vi_text in enumerate(translated):
        if i + j < len(ted_list):
            ted_list[i + j]["textVi"] = vi_text

print(f"Processed {len(ted_list)} TEDx cues with bilingual translations.")

with open("/home/vodailoc/VocabMaster/src/data/ted_427_cues.json", "w", encoding="utf-8") as f:
    f.write(json.dumps(ted_list, ensure_ascii=False, indent=2))
print("Saved to src/data/ted_427_cues.json!")
