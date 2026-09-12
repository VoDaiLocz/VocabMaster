import sys
import json
from youtube_transcript_api import YouTubeTranscriptApi

def get_transcript(video_id):
    try:
        api = YouTubeTranscriptApi()
        tlist = api.list(video_id)
        
        # Try to find english first, if not, get the first available one
        try:
            source_t = tlist.find_transcript(['en', 'en-US', 'en-GB'])
        except:
            # Fallback to the first available transcript
            source_t = list(tlist)[0]

        en_cues = source_t.fetch()
        
        # Translate to Vietnamese
        vi_cues = []
        try:
            vi_t = source_t.translate('vi')
            vi_cues = vi_t.fetch()
        except Exception as e:
            # Never duplicate English into Vietnamese!
            vi_cues = []

        def get_attr(cue, attr, default=''):
            if hasattr(cue, attr):
                return getattr(cue, attr)
            if isinstance(cue, dict):
                return cue.get(attr, default)
            return default

        # Batch translator using public Google Translate endpoint if YouTube translation was unavailable
        def batch_translate(texts_to_translate):
            import urllib.request
            import urllib.parse
            if not texts_to_translate:
                return []
            try:
                combined = "\n".join(texts_to_translate)
                url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=" + urllib.parse.quote(combined)
                req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(req, timeout=4) as resp:
                    data = json.loads(resp.read().decode('utf-8'))
                    translated_full = "".join(x[0] for x in data[0] if x[0])
                    lines = translated_full.split("\n")
                    # Match lengths
                    if len(lines) == len(texts_to_translate):
                        return lines
                    elif len(lines) > len(texts_to_translate):
                        return lines[:len(texts_to_translate)]
                    else:
                        return lines + [""] * (len(texts_to_translate) - len(lines))
            except:
                return [""] * len(texts_to_translate)

        # Extract base english cues
        base_cues = []
        for idx in range(len(en_cues)):
            en_cue = en_cues[idx]
            vi_cue = vi_cues[idx] if idx < len(vi_cues) else None

            raw_en = get_attr(en_cue, 'text', '')
            raw_vi = get_attr(vi_cue, 'text', '') if vi_cue else ''

            text_en = str(raw_en).replace("\n", " ").strip()
            text_vi = str(raw_vi).replace("\n", " ").strip()

            if not text_en:
                continue

            # If text_vi is identical to text_en, it's NOT translated
            if text_vi.lower() == text_en.lower():
                text_vi = ""

            try:
                start = round(float(get_attr(en_cue, 'start', 0)), 2)
            except:
                start = 0.0
            try:
                duration = round(float(get_attr(en_cue, 'duration', 0)), 2)
            except:
                duration = 2.0
            end = round(start + duration, 2)
            words = [w for w in text_en.split() if w]

            base_cues.append({
                "id": len(base_cues) + 1,
                "start": start,
                "duration": duration,
                "end": end,
                "textEn": text_en,
                "textVi": text_vi,
                "words": words
            })

        # If YouTube translation failed, pre-translate the first 60 cues directly
        needs_translation = [c for c in base_cues[:60] if not c["textVi"]]
        if needs_translation:
            CHUNK = 20
            for i in range(0, len(needs_translation), CHUNK):
                sub_group = needs_translation[i:i + CHUNK]
                texts = [c["textEn"] for c in sub_group]
                vi_results = batch_translate(texts)
                for item, vi_res in zip(sub_group, vi_results):
                    if vi_res and vi_res.strip().lower() != item["textEn"].lower():
                        item["textVi"] = vi_res.strip()

        print(json.dumps(base_cues, ensure_ascii=False))

    except Exception as e:
        print("Error:", str(e), file=sys.stderr)
        print(json.dumps([]))

if __name__ == "__main__":
    if len(sys.argv) > 1:
        vid = sys.argv[1].strip()
        get_transcript(vid)
    else:
        print(json.dumps([]))
