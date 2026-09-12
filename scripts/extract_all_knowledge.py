import json
import re
import os

print("=== STARTING COMPREHENSIVE KNOWLEDGE EXTRACTION ===")

# 1. EXTRACT 300 FOUNDATION WORDS (Tiếng Anh Cơ Bản 30 ngày)
path_300 = "/home/vodailoc/toeci/data/pdf-text-corpus/013-t-ng-h-p-300-t-v-ng-toeic-cho-tr-nh-d-m-t-g-c-pdf.txt"
foundation_words = []
current_day = 1

if os.path.exists(path_300):
    with open(path_300, "r", encoding="utf-8", errors="ignore") as f:
        lines = f.readlines()
    
    word_pattern = re.compile(r"^\s*(\d+)\.\s+([A-Za-z\-]+)\s*(\([a-z]+\))?\s*(/[^/]+/)?\s*:\s*(.+)$")
    day_pattern = re.compile(r"Day\s+(\d+)", re.IGNORECASE)

    current_item = None
    for line in lines:
        line_str = line.strip()
        day_match = day_pattern.search(line_str)
        if day_match and ("Ngày" in line_str or "Day" in line_str):
            try:
                current_day = int(day_match.group(1))
            except:
                pass

        match = word_pattern.match(line_str)
        if match:
            idx = int(match.group(1))
            word = match.group(2).strip()
            pos = match.group(3).strip("()") if match.group(3) else "v/n"
            ipa = match.group(4).strip() if match.group(4) else ""
            meaning = match.group(5).strip()

            current_item = {
                "id": f"fd-d{current_day}-{idx}-{word.lower()}",
                "day": current_day,
                "order": idx,
                "word": word,
                "pos": pos,
                "ipa": ipa,
                "meaning": meaning,
                "exampleEn": "",
                "exampleVi": ""
            }
            foundation_words.append(current_item)
        elif current_item and not current_item["exampleEn"] and line_str and not line_str.startswith("Hoạt động") and not line_str.startswith("STT") and not line_str.startswith("Today"):
            # Try to grab example sentence
            if re.search(r"[A-Z][a-z]+.*?\.", line_str):
                current_item["exampleEn"] = line_str

    print(f"Extracted {len(foundation_words)} Foundation Words across {current_day} days.")
    # Save to src/data/fundamentals_300_words.json
    with open("/home/vodailoc/VocabMaster/src/data/fundamentals_300_words.json", "w", encoding="utf-8") as f:
        json.dump(foundation_words, f, ensure_ascii=False, indent=2)

# 2. EXTRACT 1500 TOEIC VOCABULARY (Theo Part 1 - Part 7)
path_1500 = "/home/vodailoc/toeci/data/pdf-text-corpus/002-1500-t-v-ng-toeic-th-ng-g-p-pdf.txt"
toeic_words = []
current_part = 1

if os.path.exists(path_1500):
    with open(path_1500, "r", encoding="utf-8", errors="ignore") as f:
        lines = f.readlines()
    
    part_pattern = re.compile(r"^\s*PART\s*(\d+)", re.IGNORECASE)
    # 1 Arrange (v) /əˈreɪn(d)ʒ/ Sắp xếp She had just finished...
    row_pattern = re.compile(r"^\s*(\d+)\s+([A-Za-z\-]+)\s+(\([a-z\.,\s]+\))\s*(/[^/]+/)?\s+(.+)$")

    for i, line in enumerate(lines):
        line_str = line.strip()
        p_match = part_pattern.search(line_str)
        if p_match:
            try:
                current_part = int(p_match.group(1))
            except:
                pass
        
        m = row_pattern.match(line_str)
        if m:
            num = int(m.group(1))
            word = m.group(2).strip()
            pos = m.group(3).strip()
            ipa = m.group(4).strip() if m.group(4) else ""
            rest = m.group(5).strip()

            # Rest usually has Meaning and Example
            meaning = rest
            example_en = ""
            example_vi = ""

            # Check next lines for examples if any
            if i + 1 < len(lines) and lines[i+1].strip() and not row_pattern.match(lines[i+1].strip()):
                example_en = lines[i+1].strip()
                if i + 2 < len(lines) and lines[i+2].strip() and not row_pattern.match(lines[i+2].strip()):
                    example_vi = lines[i+2].strip()

            toeic_words.append({
                "id": f"tw-p{current_part}-{num}-{word.lower()}",
                "part": current_part,
                "order": num,
                "word": word,
                "pos": pos,
                "ipa": ipa,
                "meaning": meaning,
                "exampleEn": example_en,
                "exampleVi": example_vi
            })

    print(f"Extracted {len(toeic_words)} TOEIC Vocabulary words.")
    with open("/home/vodailoc/VocabMaster/src/data/toeic_1500_vocabulary.json", "w", encoding="utf-8") as f:
        json.dump(toeic_words, f, ensure_ascii=False, indent=2)

# 3. EXTRACT 886 PART 5 EXAM QUESTIONS
path_q = "/home/vodailoc/toeci/data/manual-extraction/fire-1000-part5-from-txt.jsonl"
questions = []
if os.path.exists(path_q):
    with open(path_q, "r", encoding="utf-8") as f:
        for line in f:
            line_str = line.strip()
            if not line_str: continue
            try:
                data = json.loads(line_str)
                # Map into clean schema
                q_obj = {
                    "id": f"q-p5-{data.get('questionNumber', len(questions)+1)}",
                    "questionNumber": data.get("questionNumber", len(questions)+1),
                    "prompt": data.get("prompt", ""),
                    "options": data.get("options", {}),
                    "correctOption": data.get("correctOption") or data.get("answerKey") or "A",
                    "explanationVi": data.get("explanationVi") or data.get("explanation") or "",
                    "grammarTag": data.get("grammarTag") or "Part 5 Grammar & Vocab",
                    "difficulty": data.get("difficulty") or "Medium"
                }
                questions.append(q_obj)
            except:
                pass
    print(f"Extracted {len(questions)} Part 5 Exam Questions.")
    with open("/home/vodailoc/VocabMaster/src/data/toeic_part5_question_bank.json", "w", encoding="utf-8") as f:
        json.dump(questions, f, ensure_ascii=False, indent=2)

print("=== EXTRACTION COMPLETE ===")
