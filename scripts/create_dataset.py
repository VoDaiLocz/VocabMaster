import os
import json

out_dir = "/home/vodailoc/VocabMaster/src/data/sentence-patterns"

def make_sentence(stage_prefix, topic_idx, s_idx, en, vi, pattern, explanation):
    words = en.strip().split()
    return {
        "id": f"{stage_prefix}_t{topic_idx:02d}_{s_idx:02d}",
        "textEn": en,
        "textVi": vi,
        "pattern": pattern,
        "explanation": explanation,
        "wordTiles": words
    }

# Let's write the complete generator
