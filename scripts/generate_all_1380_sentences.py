import json
import os

out_dir = "/home/vodailoc/VocabMaster/src/data/sentence-patterns"
os.makedirs(out_dir, exist_ok=True)

def write_ts_file(filepath, stage_id, var_name, topics):
    total = sum(len(t["sentences"]) for t in topics)
    lines = []
    lines.append("// ============================================")
    lines.append(f"// Sentence Master - Stage {stage_id} ({total} Sentences)")
    lines.append("// ============================================")
    lines.append("")
    lines.append("import { SentenceTopic } from './types'")
    lines.append("")
    lines.append(f"export const {var_name}: SentenceTopic[] = [")
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
    with open(filepath, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    print(f"Generated {filepath} with {total} sentences across {len(topics)} topics.")

# Let's generate rich, practical, diverse datasets for all 4 stages
exec(open("/home/vodailoc/VocabMaster/scripts/data_definitions.py").read())
