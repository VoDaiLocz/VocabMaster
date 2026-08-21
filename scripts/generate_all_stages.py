import json
import os

out_dir = "/home/vodailoc/VocabMaster/src/data/sentence-patterns"

# Let's verify directory exists
os.makedirs(out_dir, exist_ok=True)

# Helper function to generate clean word tiles without attached punctuation if needed, or keeping standard tokenization
def get_tiles(en):
    # Keep words naturally splittable
    return en.strip().split()

print("Ready to construct sentence dataset.")
