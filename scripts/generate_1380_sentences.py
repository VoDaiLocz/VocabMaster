import os
import json
import random

out_dir = "/home/vodailoc/VocabMaster/src/data/sentence-patterns"

def format_ts_file(stage_id, stage_var_name, topics):
    total_sentences = sum(len(t["sentences"]) for t in topics)
    lines = []
    lines.append("// ============================================")
    lines.append(f"// Sentence Master - Stage {stage_id} ({total_sentences} Sentences)")
    lines.append("// ============================================")
    lines.append("")
    lines.append("import { SentenceTopic } from './types'")
    lines.append("")
    lines.append(f"export const {stage_var_name}: SentenceTopic[] = [")
    
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

print("Script framework ready.")
