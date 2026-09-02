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
        try:
            vi_t = source_t.translate('vi')
            vi_cues = vi_t.fetch()
        except:
            vi_cues = en_cues # Fallback if translation fails

        cues_list = []
        # Zip them together
        for idx in range(len(en_cues)):
            en_cue = en_cues[idx]
            vi_cue = vi_cues[idx] if idx < len(vi_cues) else en_cue

            text_en = en_cue['text'].replace("\n", " ").strip()
            if not text_en:
                continue

            start = round(float(en_cue['start']), 2)
            duration = round(float(en_cue['duration']), 2)
            end = round(start + duration, 2)
            words = [w for w in text_en.split() if w]
            
            cues_list.append({
                "id": idx + 1,
                "start": start,
                "duration": duration,
                "end": end,
                "textEn": text_en,
                "textVi": vi_cue['text'].replace("\n", " ").strip(),
                "words": words
            })

        print(json.dumps(cues_list, ensure_ascii=False))

    except Exception as e:
        print("Error:", str(e), file=sys.stderr)
        print(json.dumps([]))

if __name__ == "__main__":
    if len(sys.argv) > 1:
        vid = sys.argv[1].strip()
        get_transcript(vid)
    else:
        print(json.dumps([]))
