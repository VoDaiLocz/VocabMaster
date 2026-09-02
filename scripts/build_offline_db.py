#!/usr/bin/env python3
import json
import os
from youtube_transcript_api import YouTubeTranscriptApi
import time

METADATA_FILE = "src/data/offline_se_videos_metadata.json"
OUTPUT_FILE = "src/data/offline_transcripts.json"

def fetch_and_translate(video_id):
    try:
        api = YouTubeTranscriptApi()
        tlist = api.list(video_id)
        
        # Tìm tiếng Anh gốc
        try:
            source_t = tlist.find_transcript(['en', 'en-US', 'en-GB'])
        except:
            source_t = list(tlist)[0]

        en_cues = source_t.fetch()
        
        # Dịch song ngữ bằng AI nội bộ YouTube
        try:
            vi_cues = source_t.translate('vi').fetch()
        except:
            vi_cues = en_cues

        cues_list = []
        for idx in range(len(en_cues)):
            en_cue = en_cues[idx]
            vi_cue = vi_cues[idx] if idx < len(vi_cues) else en_cue

            text_en = en_cue['text'].replace("\n", " ").strip()
            if not text_en:
                continue

            cues_list.append({
                "id": idx + 1,
                "start": round(float(en_cue['start']), 2),
                "duration": round(float(en_cue['duration']), 2),
                "end": round(float(en_cue['start']) + float(en_cue['duration']), 2),
                "textEn": text_en,
                "textVi": vi_cue['text'].replace("\n", " ").strip(),
                "words": [w for w in text_en.split() if w]
            })
        return cues_list
    except Exception as e:
        print(f"Lỗi tải video {video_id}: {str(e)}")
        return []

def build_db():
    print("🚀 Bắt đầu tiến trình tải dữ liệu Offline...")
    with open(METADATA_FILE, 'r', encoding='utf-8') as f:
        videos = json.load(f)

    # Đọc db cũ nếu có
    db = {}
    if os.path.exists(OUTPUT_FILE):
        with open(OUTPUT_FILE, 'r', encoding='utf-8') as f:
            try:
                db = json.load(f)
            except:
                pass

    for i, v in enumerate(videos):
        vid = v['videoId']
        if vid in db and len(db[vid]) > 0:
            print(f"[{i+1}/{len(videos)}] Đã có sẵn: {vid} - Bỏ qua.")
            continue
            
        print(f"[{i+1}/{len(videos)}] Đang cào phụ đề cho: {vid} - {v['title']}...")
        cues = fetch_and_translate(vid)
        if cues:
            db[vid] = cues
            print(f"   -> Thành công: Tải được {len(cues)} câu song ngữ.")
        else:
            print(f"   -> Thất bại: Không lấy được phụ đề.")
            
        time.sleep(1) # Tránh bị YouTube block do spam

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(db, f, ensure_ascii=False, indent=2)
        
    print(f"✅ Hoàn tất! Đã đóng gói thành công tổng cộng {len(db.keys())} bộ phụ đề vào {OUTPUT_FILE}")

if __name__ == "__main__":
    build_db()
