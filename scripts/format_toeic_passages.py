#!/usr/bin/env python3
"""
scripts/format_toeic_passages.py
Comprehensive parser and formatter for all Part 6 and Part 7 reading passages in toeic_7parts_comprehensive_bank.json.
"""

import json
import re

DATA_PATH = '/home/vodailoc/VocabMaster/src/data/toeic_7parts_comprehensive_bank.json'

def clean_ocr_artifacts(text: str) -> str:
    """Remove common OCR scanning noise."""
    # Remove scanner boundary lines like W//////////////////...Q#/////
    text = re.sub(r'[Ww/\\#_]{8,}', ' ', text)
    # Remove OCR vertical border bars like "I I I I I I I" or "I I"
    text = re.sub(r'(?:^|\s)(?:I\s+){2,}I(?:\s|$)', ' ', text)
    text = re.sub(r'\s+I\s+I\b', ' ', text)
    text = re.sub(r'\s+I\b(?=\s*$|\s*\n)', '', text)
    # Remove email fax OCR artifacts like 000 c::::> I
    text = re.sub(r'000\s*c::::>\s*I\s*', '', text)
    # Remove stray quotation marks with dashes at start
    text = re.sub(r'^[\s\-_"\'\.]+', '', text)
    # Remove trailing page numbers at the very end (e.g. "Samantha Kee 48" -> "Samantha Kee")
    text = re.sub(r'\s+\d{1,3}\s*$', '', text)
    # Clean broken hyphenation like "av?-ilable" -> "available"
    text = re.sub(r'(\w+)\s*[\?\-]+\s*(\w+)', r'\1\2', text)
    # Clean broken time patterns like "7P .M." or "7 P.M."
    text = re.sub(r'(?<!:)(\b\d{1,2})\s*P\s*\.?\s*M\.', r'\1:00 P.M.', text)
    text = re.sub(r'(?<!:)(\b\d{1,2})\s*A\s*\.?\s*M\.', r'\1:00 A.M.', text)
    # Normalize multiple spaces
    text = re.sub(r'[ \t]+', ' ', text)
    return text.strip()

def extract_direction(text: str) -> tuple[str, str]:
    """Extract Questions xxx-xxx refer to the following... prefix and return (direction, clean_body)"""
    # Look for direction at start
    m = re.match(r'^(Questions?\s+\d+[-\s]+\d+\s+refer\s+to\s+the\s+following[^.]*\.\.?)\s*(.*)$', text, flags=re.IGNORECASE | re.DOTALL)
    if m:
        direction = m.group(1).strip()
        body = m.group(2).strip()
        return direction, body
    return "", text.strip()

def format_email_headers(text: str) -> str:
    """Format From:, To:, Date:, Subject: into clean lines."""
    text = re.sub(r'\s*\|\s*', ' ', text)
    
    headers = [
        (r'\b(From\s*:)', r'\n\1'),
        (r'\b(To\s*:)', r'\n\1'),
        (r'\b(Date\s*:)', r'\n\1'),
        (r'\b(Subject\s*:)', r'\n\1'),
        (r'\b(Sent\s*:)', r'\n\1'),
        (r'\b(Cc\s*:)', r'\n\1'),
        (r'\b(Re\s*:)', r'\n\1'),
    ]
    for pat, rep in headers:
        text = re.sub(pat, rep, text, flags=re.IGNORECASE)
    
    return text

def format_chat_messages(text: str) -> str:
    """Format text message chains into neat message bubbles with timestamps."""
    text = re.sub(r'["\',\.]{2,}', ' ', text)
    
    time_pat = r'(\d{1,2}:\s*\d{2}\s*(?:[AP]\.?M\.?|am|pm))'
    parts = re.split(time_pat, text)
    if len(parts) > 2:
        formatted = []
        current_speaker = "Participant"
        for idx in range(0, len(parts) - 1, 2):
            segment = parts[idx].strip()
            timestamp = re.sub(r'\s+', '', parts[idx + 1].strip())
            
            words = segment.split()
            if len(words) >= 2 and words[0][0].isupper() and (len(words) > 1 and words[1][0].isupper()):
                speaker = f"{words[0]} {words[1]}"
                msg = " ".join(words[2:])
            elif len(words) >= 1 and words[0][0].isupper():
                speaker = words[0]
                msg = " ".join(words[1:])
            else:
                speaker = current_speaker
                msg = segment
                
            current_speaker = speaker
            msg = msg.strip(' ",\'.')
            if msg:
                formatted.append(f"💬 **{speaker}** ({timestamp})\n{msg}")
                
        if len(parts) % 2 == 1 and parts[-1].strip():
            formatted.append(parts[-1].strip())
            
        return "\n\n".join(formatted)
        
    return text

def format_letter_salutations(text: str) -> str:
    """Break Dear ..., Sincerely, Regards into separate lines."""
    # Dear ...
    text = re.sub(r'\b(Dear\s+(?:Mr\.|Ms\.|Mrs\.|Dr\.|Collectors|Members|Valued|All|[A-Z][a-z]+)[^,\n]{0,35},)', r'\n\n\1\n\n', text)
    
    # Salutations (closing) - keep full phrase intact
    text = re.sub(r'\b(Warmest\s+Regards|Warm\s+Regards|Sincerely\s+yours|Sincerely|Best\s+regards|Best|Regards|Cordially),?\s*', r'\n\n\1,\n', text, flags=re.IGNORECASE)
    return text

def format_theater_program(text: str) -> str:
    """Format Theater Program / Playbill specifics."""
    if 'Pantages Theater' in text:
        text = text.replace('Pantages Theater Presents The Magic Cabinet', '🎭 **Pantages Theater Presents**\n### The Magic Cabinet\n')
        text = text.replace('Written by Bridget Darcy', '\n**Written by:** Bridget Darcy')
        text = text.replace('Directed by April Wells', '\n**Directed by:** April Wells\n')
        text = text.replace('Cast of characters', '\n**Cast of Characters:**\n')
        text = text.replace('Museum Owner played by Lee Jones', '• **Museum Owner:** played by Lee Jones\n')
        text = text.replace('Child played by Patricia Cleo', '• **Child:** played by Patricia Cleo\n')
        text = text.replace('Teacher played by Chris Clinton', '• **Teacher:** played by Chris Clinton\n')
        text = text.replace('Ghost played by Jim Prentice', '• **Ghost:** played by Jim Prentice\n')
        text = re.sub(r'September 20\s*(?:7:00\s*P\.M\.|7P\.M\.)', '\n📅 **Showtime:** September 20, 7:00 P.M.\n', text)
        text = text.replace(
            'The cast and crew would like to thank the following organizations for their generous contributions to the performance.',
            '\n*The cast and crew would like to thank the following organizations for their generous contributions to the performance:*\n'
        )
        text = text.replace('National Culture Center Playwright Throne Foundation Gerry Knight', '• National Culture Center\n• Playwright Throne Foundation\n• Gerry Knight')
    return text

def format_general_lists(text: str) -> str:
    """Format business hours, contact info, and bullets."""
    # Business hours
    text = re.sub(r'\b(Business Hours:?)\b', r'\n\n**\1**\n', text, flags=re.IGNORECASE)
    text = re.sub(r'\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\s*(-|–|to)\s*(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday):\s*', r'\n• \1 - \3: ', text)
    
    # Phone, Email, Website
    text = re.sub(r'\b(Phone:\s*[\(\)\d\s\-]+)', r'\n📞 \1', text)
    text = re.sub(r'\b(Email:\s*[^\s]+)', r'\n✉️ \1', text)
    text = re.sub(r'\b(Website:\s*[^\s]+)', r'\n🌐 \1', text)
    return text

def split_multi_passages(text: str, p_type: str) -> str:
    """Detect and split double and triple passages into distinct labeled documents."""
    # Avoid duplicate tags
    if '=== DOCUMENT' in text:
        return text
        
    p_type_lower = p_type.lower()
    
    # Double passage: Program and Letter
    if 'program and letter' in p_type_lower:
        m = re.search(r'(September\s+\d{1,2}\s*\n*\s*Dear\s+April,)', text)
        if m:
            doc1 = text[:m.start()].strip()
            doc2 = text[m.start():].strip()
            return f"=== DOCUMENT 1: PROGRAM ===\n\n{doc1}\n\n=== DOCUMENT 2: LETTER ===\n\n{doc2}"
            
    # Double passage: Letter and Memo
    if 'letter and memo' in p_type_lower:
        m = re.search(r'\b(MEMORANDUM|MEMO|To:\s*All|Dear\s+All)', text[100:], flags=re.IGNORECASE)
        if m:
            idx = 100 + m.start()
            doc1 = text[:idx].strip()
            doc2 = text[idx:].strip()
            return f"=== DOCUMENT 1: LETTER ===\n\n{doc1}\n\n=== DOCUMENT 2: MEMO ===\n\n{doc2}"

    # Double passage: Two Letters
    if 'two letters' in p_type_lower:
        matches = list(re.finditer(r'\b(Dear\s+[A-Z][a-z]+[^,]{0,25},)', text))
        if len(matches) >= 2:
            second_m = matches[1]
            doc1 = text[:second_m.start()].strip()
            doc2 = text[second_m.start():].strip()
            return f"=== DOCUMENT 1: FIRST LETTER ===\n\n{doc1}\n\n=== DOCUMENT 2: SECOND LETTER ===\n\n{doc2}"

    # General multi-passage with Email (From: ... To: ...)
    email_markers = list(re.finditer(r'\bFrom\s*:\s*', text, flags=re.IGNORECASE))
    if len(email_markers) >= 2 and any(k in p_type_lower for k in ['and', 'two', 'three', 'emails', 'e-mails']):
        parts = []
        last_idx = 0
        for i, em in enumerate(email_markers):
            if i > 0:
                parts.append((f"=== DOCUMENT {i}: E-MAIL ===", text[last_idx:em.start()].strip()))
            last_idx = em.start()
        parts.append((f"=== DOCUMENT {len(email_markers)}: E-MAIL ===", text[last_idx:].strip()))
        
        header_text = text[:email_markers[0].start()].strip()
        result = []
        if header_text:
            result.append(f"=== DOCUMENT 1 ===\n\n{header_text}")
            for i, (title, content) in enumerate(parts):
                result.append(f"=== DOCUMENT {i+2}: E-MAIL ===\n\n{content}")
        else:
            for title, content in parts:
                result.append(f"{title}\n\n{content}")
        return "\n\n".join(result)

    return text

def format_paragraphs(text: str) -> str:
    """Break text into natural paragraphs of 2-3 sentences."""
    lines = text.split('\n')
    formatted = []
    
    for line in lines:
        line = line.strip()
        if not line:
            formatted.append('')
            continue
            
        # Preserve document headers, chat bubbles, bullet points, email fields, dates
        if (line.startswith('===') or line.startswith('💬') or line.startswith('•') or 
            line.startswith('📅') or line.startswith('📞') or line.startswith('✉️') or
            line.startswith('🎭') or line.startswith('#') or line.startswith('*') or
            re.match(r'^(From|To|Date|Subject|Cc|Sent):', line, re.IGNORECASE) or
            line.startswith('Dear ') or len(line) < 85):
            formatted.append(line)
            continue
            
        # Break long blocks at sentence boundaries
        sentences = re.split(r'(?<=[.!?])\s+(?=[A-Z0-9"\'])', line)
        if len(sentences) > 3:
            buf = []
            for i, s in enumerate(sentences):
                buf.append(s)
                if (i + 1) % 3 == 0 and i < len(sentences) - 1:
                    formatted.append(' '.join(buf))
                    formatted.append('')
                    buf = []
            if buf:
                formatted.append(' '.join(buf))
        else:
            formatted.append(line)
            
    res = '\n'.join(formatted)
    res = re.sub(r'\n{3,}', '\n\n', res)
    return res.strip()

def process_passage(raw_text: str, passage_type: str = '') -> tuple[str, str]:
    if not raw_text:
        return "", passage_type
        
    direction, body = extract_direction(raw_text)
    effective_type = passage_type or direction
    
    body = clean_ocr_artifacts(body)
    
    if any(k in effective_type.lower() for k in ['chat', 'text message', 'chain']):
        body = format_chat_messages(body)
    else:
        body = format_email_headers(body)
        body = format_letter_salutations(body)
        body = format_theater_program(body)
        body = format_general_lists(body)
        body = split_multi_passages(body, effective_type)
        body = format_paragraphs(body)
        
    return body, effective_type

def main():
    print(f"Loading {DATA_PATH}...")
    with open(DATA_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    count = 0
    for q in data:
        if q.get('part') in (6, 7) and q.get('passageText'):
            pt, effective_type = process_passage(q['passageText'], q.get('passageType', ''))
            q['passageText'] = pt
            if effective_type:
                q['passageType'] = effective_type
            count += 1
            
    print(f"Processed {count} questions.")
    with open(DATA_PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print("Saved successfully!")
    
    # Print sample Q181
    q181 = next((q for q in data if 'The Magic Cabinet' in q.get('passageText', '')), None)
    if q181:
        print("\n=======================================================")
        print(f"SAMPLE OUTPUT: {q181['passageType']}")
        print("=======================================================")
        print(q181['passageText'])
        print("=======================================================")

if __name__ == '__main__':
    main()
