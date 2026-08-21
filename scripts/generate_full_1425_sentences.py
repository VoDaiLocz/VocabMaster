import os
import json

out_dir = "/home/vodailoc/VocabMaster/src/data/sentence-patterns"
os.makedirs(out_dir, exist_ok=True)

# Helper function to generate clean sentences
def make_s(s_id, en, vi, pat, exp):
    # Ensure tiles are split naturally
    words = en.strip().split()
    return {
        "id": s_id,
        "textEn": en,
        "textVi": vi,
        "pattern": pat,
        "explanation": exp,
        "wordTiles": words
    }

def format_ts_file(stage_num, var_name, topics):
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

print("Generator helper loaded.")
