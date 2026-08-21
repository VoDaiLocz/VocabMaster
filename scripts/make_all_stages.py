import json
import os

out_dir = "/home/vodailoc/VocabMaster/src/data/sentence-patterns"

def write_stage_file(stage_num, var_name, topics):
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
    
    filename = os.path.join(out_dir, f"stage{stage_num}_{var_name.replace('STAGE_', '').replace('_TOPICS', '').lower()}.ts")
    # specific naming
    target_names = {
        1: "stage1_foundation.ts",
        2: "stage2_daily.ts",
        3: "stage3_workplace.ts",
        4: "stage4_it_tech.ts"
    }
    actual_path = os.path.join(out_dir, target_names[stage_num])
    with open(actual_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    print(f"Wrote {actual_path} with {total} sentences.")

# Let's generate data
