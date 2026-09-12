import json
import re
import os

print("=== BUILDING FULL KNOWLEDGE BASE ===")

# --- 1. EXTRACT 300 FOUNDATION WORDS (013) ---
path_013 = "/home/vodailoc/toeci/data/pdf-text-corpus/013-t-ng-h-p-300-t-v-ng-toeic-cho-tr-nh-d-m-t-g-c-pdf.txt"
foundation_days = {}

if os.path.exists(path_013):
    with open(path_013, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    # Split by days
    day_chunks = re.split(r"(?:Day\s+(\d+)\s*[-–]\s*Ngày\s+\d+)", content, flags=re.IGNORECASE)
    # day_chunks[0] is preamble, then [1] is day number, [2] is content, [3] is day number, etc.
    
    current_day = 1
    total_found = 0
    words_list = []

    for i in range(1, len(day_chunks), 2):
        d_num = int(day_chunks[i])
        chunk = day_chunks[i+1]
        
        # In this chunk, match lines like:
        # 1. Draw (v) /drɔː/: vẽ      He draws a circle...
        lines = chunk.split("\n")
        w_regex = re.compile(r"^\s*(\d+)\.\s+([A-Za-z\s\-]+?)\s*(\([a-z\.,\s\-/]+\))?\s*(/[^/]+/)?\s*:\s*(.+)$")
        
        for idx, line in enumerate(lines):
            line_str = line.strip()
            m = w_regex.match(line_str)
            if m:
                w_order = int(m.group(1))
                word = m.group(2).strip()
                pos = m.group(3).strip("()") if m.group(3) else "v/n"
                ipa = m.group(4).strip() if m.group(4) else ""
                rest = m.group(5).strip()

                # Separating meaning and example
                meaning = rest
                example_en = ""
                # Often example is separated by multiple spaces
                parts = re.split(r"\s{2,}", rest)
                if len(parts) >= 2:
                    meaning = parts[0].strip()
                    example_en = parts[1].strip()

                words_list.append({
                    "id": f"fnd-d{d_num:02d}-{w_order:02d}-{word.lower().replace(' ', '-')}",
                    "day": d_num,
                    "order": w_order,
                    "word": word,
                    "pos": pos,
                    "ipa": ipa,
                    "meaning": meaning,
                    "exampleEn": example_en,
                    "exampleVi": ""
                })
                total_found += 1

    print(f"Extracted {len(words_list)} Foundation Words across {len(day_chunks)//2} Days.")
    with open("/home/vodailoc/VocabMaster/src/data/fundamentals_300_words.json", "w", encoding="utf-8") as f:
        json.dump(words_list, f, ensure_ascii=False, indent=2)

# --- 2. EXTRACT 1500 TOEIC VOCABULARY (002) ---
path_002 = "/home/vodailoc/toeci/data/pdf-text-corpus/002-1500-t-v-ng-toeic-th-ng-g-p-pdf.txt"
toeic_list = []

if os.path.exists(path_002):
    with open(path_002, "r", encoding="utf-8", errors="ignore") as f:
        text = f.read()

    # Split into Part sections
    part_chunks = re.split(r"(?:PART\s+(\d+))", text, flags=re.IGNORECASE)
    # pattern: STT Word Pos IPA Meaning Example
    item_regex = re.compile(r"^\s*(\d+)\s+([A-Za-z\s\-\'’]+?)\s+(\([a-z\.,\s\-/]+\))\s*(/[^/]+/)?\s+(.+)$")

    for i in range(1, len(part_chunks), 2):
        p_num = int(part_chunks[i])
        p_text = part_chunks[i+1]
        lines = p_text.split("\n")

        current_item = None
        for l_idx, l in enumerate(lines):
            l_str = l.strip()
            if not l_str:
                continue
            m = item_regex.match(l_str)
            if m:
                order = int(m.group(1))
                word = m.group(2).strip()
                pos = m.group(3).strip()
                ipa = m.group(4).strip() if m.group(4) else ""
                rest = m.group(5).strip()

                meaning = rest
                example_en = ""
                example_vi = ""

                # Lookahead for examples on next 1-2 lines
                if l_idx + 1 < len(lines):
                    next_1 = lines[l_idx + 1].strip()
                    if next_1 and not item_regex.match(next_1) and not next_1.startswith("STT") and not next_1.startswith("Tài liệu"):
                        example_en = next_1
                        if l_idx + 2 < len(lines):
                            next_2 = lines[l_idx + 2].strip()
                            if next_2 and not item_regex.match(next_2) and not next_2.startswith("STT") and not next_2.startswith("Tài liệu"):
                                example_vi = next_2

                current_item = {
                    "id": f"toeic-p{p_num}-{order:04d}-{word.lower().replace(' ', '-')}",
                    "part": p_num,
                    "order": order,
                    "word": word,
                    "pos": pos,
                    "ipa": ipa,
                    "meaning": meaning,
                    "exampleEn": example_en,
                    "exampleVi": example_vi
                }
                toeic_list.append(current_item)

    print(f"Extracted {len(toeic_list)} TOEIC Vocabulary items across Parts 1-7.")
    with open("/home/vodailoc/VocabMaster/src/data/toeic_1500_vocabulary.json", "w", encoding="utf-8") as f:
        json.dump(toeic_list, f, ensure_ascii=False, indent=2)

# --- 3. EXTRACT 60 EXAM TACTICS & TRAPS (011 + 047) ---
path_011 = "/home/vodailoc/toeci/data/pdf-text-corpus/011-thu-thuat-lam-bai-thi-toeic-pdf.txt"
tactics_list = []

if os.path.exists(path_011):
    with open(path_011, "r", encoding="utf-8", errors="ignore") as f:
        t_text = f.read()

    # Match each (\d+)
    t_chunks = re.split(r"\s*(\d+)\s*", t_text)
    
    current_part = 1
    for i in range(1, len(t_chunks), 2):
        t_num = int(t_chunks[i])
        body = t_chunks[i+1].strip()
        body_lines = [b.strip() for b in body.split("\n") if b.strip()]
        
        title = body_lines[0] if body_lines else f"Thủ thuật TOEIC #{t_num}"
        
        # Determine Part based on trick number
        if t_num <= 8:
            part = 1
        elif t_num <= 15:
            part = 2
        elif t_num <= 25:
            part = 3
        elif t_num <= 35:
            part = 4
        elif t_num <= 45:
            part = 5
        elif t_num <= 52:
            part = 6
        else:
            part = 7

        content_desc = "\n".join(body_lines[1:6]) if len(body_lines) > 1 else title
        examples = [b for b in body_lines if b.startswith("") or b.startswith("•") or b.startswith("-") or "Example" in b]

        tactics_list.append({
            "id": f"tactic-{t_num:02d}",
            "trickNumber": t_num,
            "part": part,
            "title": title,
            "category": "Kỹ xảo & Bẫy đề thi",
            "description": content_desc[:400],
            "examples": examples[:4]
        })

    print(f"Extracted {len(tactics_list)} TOEIC Exam Tactics.")
    with open("/home/vodailoc/VocabMaster/src/data/toeic_exam_tactics.json", "w", encoding="utf-8") as f:
        json.dump(tactics_list, f, ensure_ascii=False, indent=2)

print("=== ALL BASE DATA PERSISTED SUCCESSFULLY ===")
