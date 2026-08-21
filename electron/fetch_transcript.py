import sys
import json
import urllib.parse
import urllib.request
from youtube_transcript_api import YouTubeTranscriptApi

def translate_batch(texts):
    if not texts:
        return []
    # Join with newlines for efficient batch translation
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
    except Exception:
        pass
    return texts

def get_transcript(video_id):
    api = YouTubeTranscriptApi()
    
    # Try fetching transcript
    raw_cues = None
    try:
        raw_cues = api.fetch(video_id)
    except Exception as e:
        # Try listing transcripts to find available language
        try:
            transcript_list = api.list(video_id)
            for t in transcript_list:
                try:
                    raw_cues = t.fetch()
                    break
                except:
                    continue
        except Exception:
            pass

    if not raw_cues:
        print(json.dumps([]))
        return

    # Process cues
    cues_list = []
    en_texts = []
    for idx, cue in enumerate(raw_cues):
        text_en = cue.text.replace("\n", " ").strip()
        if not text_en:
            continue
        start = round(float(cue.start), 2)
        duration = round(float(cue.duration), 2)
        end = round(start + duration, 2)
        words = [w for w in text_en.split() if w]
        cues_list.append({
            "id": idx + 1,
            "start": start,
            "duration": duration,
            "end": end,
            "textEn": text_en,
            "textVi": text_en, # placeholder
            "words": words
        })
        en_texts.append(text_en)

    # Batch translate in chunks of 25 to avoid URL length limit
    chunk_size = 25
    for i in range(0, len(cues_list), chunk_size):
        chunk_texts = en_texts[i:i+chunk_size]
        translated = translate_batch(chunk_texts)
        for j, vi_text in enumerate(translated):
            if i + j < len(cues_list):
                cues_list[i + j]["textVi"] = vi_text

    print(json.dumps(cues_list, ensure_ascii=False))

if __name__ == "__main__":
    if len(sys.argv) > 1:
        vid = sys.argv[1].strip()
        get_transcript(vid)
    else:
        print(json.dumps([]))
