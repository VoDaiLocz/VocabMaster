import json
import os

out_dir = "/home/vodailoc/VocabMaster/src/data/sentence-patterns"

def format_ts(stage_num, var_name, topics):
    total = sum(len(t["sentences"]) for t in topics)
    lines = [
        "// ============================================",
        f"// Sentence Master - Stage {stage_num} ({total} Sentences)",
        "// ============================================",
        "",
        "import { SentenceTopic } from './types'",
        "",
        f"export const {var_name}: SentenceTopic[] = ["
    ]
    for t in topics:
        lines.append("  {")
        lines.append(f"    id: '{t['id']}',")
        lines.append(f"    stageId: '{t['stageId']}',")
        lines.append(f"    title: {json.dumps(t['title'])},")
        lines.append(f"    titleVi: {json.dumps(t['titleVi'])},")
        lines.append(f"    description: {json.dumps(t['description'])},")
        lines.append(f"    icon: '{t['icon']}',")
        lines.append(f"    level: '{t['level']}',")
        lines.append("    sentences: [")
        for s in t["sentences"]:
            lines.append("      {")
            lines.append(f"        id: '{s['id']}',")
            lines.append(f"        textEn: {json.dumps(s['textEn'])},")
            lines.append(f"        textVi: {json.dumps(s['textVi'])},")
            lines.append(f"        pattern: {json.dumps(s['pattern'])},")
            lines.append(f"        explanation: {json.dumps(s['explanation'])},")
            lines.append(f"        wordTiles: {json.dumps(s['wordTiles'])},")
            lines.append("      },")
        lines.append("    ],")
        lines.append("  },")
    lines.append("]")
    lines.append("")
    return "\n".join(lines)

def make_topic(t_id, stage_id, title, title_vi, desc, icon, level, s_list):
    sentences = []
    for idx, (en, vi, pat, exp) in enumerate(s_list, 1):
        sentences.append({
            "id": f"{t_id}_{idx:03d}",
            "textEn": en,
            "textVi": vi,
            "pattern": pat,
            "explanation": exp,
            "wordTiles": en.strip().split()
        })
    return {
        "id": t_id,
        "stageId": stage_id,
        "title": title,
        "titleVi": title_vi,
        "description": desc,
        "icon": icon,
        "level": level,
        "sentences": sentences
    }

print("Framework ready.")
