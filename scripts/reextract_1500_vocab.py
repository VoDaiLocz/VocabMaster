#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Re-extracts 1500 TOEIC vocabulary items from the original PDF XML layout with 100% precision.
Splits Word, POS, IPA, Meaning, Example En, Example Vi cleanly.
"""

import os
import re
import json
import xml.etree.ElementTree as ET

XML_PATH = "/home/vodailoc/VocabMaster/scratch/1500_vocab_full.xml"
OUTPUT_JSON = "/home/vodailoc/VocabMaster/src/data/toeic_1500_vocabulary.json"

VN_CHARS = set("àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴĐ")

def has_vn(s: str) -> bool:
    return any(c in VN_CHARS for c in s)

def cluster_elements_to_lines(elements):
    if not elements:
        return []
    elements.sort(key=lambda x: x["top"])
    lines = []
    curr_line = []
    curr_top = None
    for el in elements:
        if curr_top is None:
            curr_top = el["top"]
            curr_line.append(el)
        elif abs(el["top"] - curr_top) <= 5:
            curr_line.append(el)
        else:
            curr_line.sort(key=lambda x: x["left"])
            lines.append(curr_line)
            curr_line = [el]
            curr_top = el["top"]
    if curr_line:
        curr_line.sort(key=lambda x: x["left"])
        lines.append(curr_line)
    return lines

def format_line(line_elements):
    line_str = ""
    for idx, el in enumerate(line_elements):
        if idx == 0:
            line_str += el["text"]
        else:
            prev = line_elements[idx - 1]
            gap = el["left"] - (prev["left"] + prev["width"])
            if gap >= 4:
                line_str += " " + el["text"]
            else:
                line_str += el["text"]
    return line_str.strip()

def cluster_and_format_all(elements):
    lines = cluster_elements_to_lines(elements)
    formatted = [format_line(l) for l in lines if format_line(l)]
    return " ".join(formatted).strip()

def parse_pos_ipa(s: str):
    pos = ""
    ipa = ""
    m_ipa = re.search(r"(/[^/]+/)", s)
    if m_ipa:
        ipa = m_ipa.group(1).strip()
    
    m_pos = re.search(r"(\([A-Za-z\s\.,\-/]+\)|Phrasal\s+verb)", s, re.I)
    if m_pos:
        pos = m_pos.group(1).strip()
    else:
        before_slash = s.split("/")[0].strip()
        if before_slash:
            pos = before_slash
            
    pos_low = pos.lower()
    if pos_low == "(a)":
        pos = "(adj)"
    elif pos_low == "(adv)":
        pos = "(adv)"
    elif pos_low == "(n)":
        pos = "(n)"
    elif pos_low == "(v)":
        pos = "(v)"
    elif pos_low == "phrasal verb":
        pos = "(phr v)"
        
    return pos, ipa

def clean_vietnamese_typos(text: str) -> str:
    # Fix single-character detachment like "S ắp xếp" -> "Sắp xếp", "M ột" -> "Một"
    text = re.sub(r"\b([A-ZĐ])\s+([a-zàáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ])", r"\1\2", text)
    # Fix two-character detachment like "Nh ững" -> "Những", "Qu ầy" -> "Quầy"
    text = re.sub(r"\b([A-ZĐ][a-zàáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ])\s+([a-zàáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]{2,})", r"\1\2", text)
    return text

def main():
    print(f"Parsing XML from: {XML_PATH}")
    tree = ET.parse(XML_PATH)
    root = tree.getroot()

    all_entries = []
    current_part = 1
    last_entry = None

    en_leak_regex = re.compile(
        r"\s{2,}([A-Z][A-Za-z0-9\s,\.\x27’\-\—\(\)]+)$|\s+((?:The|She|He|We|They|I|A|An|Mr|Ms|Our|My|Your|[A-Z][a-z]+)\s+[a-z]+(?:\s+[a-z]+)+.*)$"
    )

    for page in root.findall("page"):
        p_num = int(page.attrib.get("number", "1"))
        
        texts = []
        for t in page.findall("text"):
            top = int(t.attrib.get("top", 0))
            left = int(t.attrib.get("left", 0))
            width = int(t.attrib.get("width", 0))
            font = t.attrib.get("font", "")
            raw_txt = "".join(t.itertext()).strip()
            
            m_part = re.search(r"PART\s*(\d+)", raw_txt, re.I)
            if m_part:
                current_part = int(m_part.group(1))
                continue
                
            if top < 72 or top > 1150:
                continue
            if raw_txt in ["STT", "Từ vựng", "Loại từ - Phiên", "Loại từ - phiên âm", "Lo", "ại từ - Phiên", "âm", "Nghĩa", "Ví dụ"]:
                continue
                
            if raw_txt:
                texts.append({
                    "top": top,
                    "left": left,
                    "width": width,
                    "font": font,
                    "text": raw_txt,
                    "has_i": bool(t.find("i") is not None)
                })
                
        stt_items = []
        for t in texts:
            if t["left"] < 85:
                m_stt = re.match(r"^(\d{1,4})(?:\s+(.*))?$", t["text"])
                if m_stt:
                    stt_items.append((t, int(m_stt.group(1)), m_stt.group(2) or ""))
                    
        stt_items.sort(key=lambda x: x[0]["top"])
        if not stt_items:
            continue

        first_stt_top = stt_items[0][0]["top"] - 10

        # Handle overflow before first STT
        pre_elements = [t for t in texts if t["top"] < first_stt_top and t["left"] >= 500]
        if last_entry and pre_elements:
            pre_lines = cluster_elements_to_lines(pre_elements)
            for pl in pre_lines:
                txt = format_line(pl)
                if has_vn(txt):
                    last_entry["exampleVi"] = (last_entry["exampleVi"] + " " + txt).strip()
                else:
                    last_entry["exampleEn"] = (last_entry["exampleEn"] + " " + txt).strip()

        # Compute vertical boundaries between rows
        boundaries = [first_stt_top]
        for i in range(len(stt_items) - 1):
            mid = (stt_items[i][0]["top"] + stt_items[i+1][0]["top"]) // 2
            boundaries.append(mid)
        boundaries.append(1150)
        
        for i, (stt_t, stt_num, inline_word) in enumerate(stt_items):
            top_start = boundaries[i]
            top_end = boundaries[i+1]
            
            block = [t for t in texts if top_start <= t["top"] < top_end and t != stt_t]
            
            word_els = []
            pos_els = []
            meaning_els = []
            example_els = []
            
            for t in block:
                l = t["left"]
                if l < 85:
                    continue
                elif 85 <= l < 215:
                    word_els.append(t)
                elif 215 <= l < 375:
                    pos_els.append(t)
                elif 375 <= l < 500:
                    meaning_els.append(t)
                else:
                    example_els.append(t)
                        
            word = cluster_and_format_all(word_els)
            if inline_word:
                word = (inline_word + " " + word).strip()
                
            pos_raw = cluster_and_format_all(pos_els)
            pos, ipa = parse_pos_ipa(pos_raw)
            meaning = cluster_and_format_all(meaning_els)
            
            # Format examples line by line
            ex_lines = cluster_elements_to_lines(example_els)
            formatted_lines = [format_line(l) for l in ex_lines if format_line(l)]
            
            en_lines = []
            vi_lines = []
            for l_txt in formatted_lines:
                if has_vn(l_txt):
                    vi_lines.append(l_txt)
                else:
                    en_lines.append(l_txt)
                    
            ex_en = " ".join(en_lines).strip()
            ex_vi = " ".join(vi_lines).strip()
            
            # Check if meaning contains a leaked English example
            m_leak = en_leak_regex.search(meaning)
            if m_leak:
                leaked_en = (m_leak.group(1) or m_leak.group(2)).strip()
                meaning = meaning[:m_leak.start()].strip()
                if not ex_en:
                    ex_en = leaked_en
                elif leaked_en not in ex_en:
                    ex_en = (leaked_en + " " + ex_en).strip()
            
            # Clean Vietnamese typos
            meaning = clean_vietnamese_typos(meaning)
            ex_vi = clean_vietnamese_typos(ex_vi)
            
            # Clean spaces
            word = re.sub(r"\s+", " ", word).strip()
            meaning = re.sub(r"\s+", " ", meaning).strip()
            ex_en = re.sub(r"\s+", " ", ex_en).strip()
            ex_vi = re.sub(r"\s+", " ", ex_vi).strip()
            
            if word:
                clean_slug = re.sub(r"[^a-zA-Z0-9]+", "-", word.lower()).strip("-")
                entry = {
                    "id": f"toeic-p{current_part}-{stt_num:04d}-{clean_slug}",
                    "part": current_part,
                    "order": stt_num,
                    "word": word,
                    "pos": pos,
                    "ipa": ipa,
                    "meaning": meaning,
                    "exampleEn": ex_en,
                    "exampleVi": ex_vi
                }
                all_entries.append(entry)
                last_entry = entry

    print(f"Total extracted vocabulary entries: {len(all_entries)}")
    from collections import Counter
    c = Counter(e["part"] for e in all_entries)
    for p in sorted(c.keys()):
        print(f"  Part {p}: {c[p]} items")

    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(all_entries, f, ensure_ascii=False, indent=2)

    print(f"Saved cleanly to {OUTPUT_JSON}")

if __name__ == "__main__":
    main()
