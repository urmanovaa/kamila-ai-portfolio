import os
from typing import List

import faiss
import numpy as np
from dotenv import load_dotenv
from openai import OpenAI

from .rag_index import load_faq_data


load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise RuntimeError("OPENAI_API_KEY is not set. Please set it in your environment or in a .env file.")

client = OpenAI(api_key=OPENAI_API_KEY)

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
DATA_PATH = os.path.join(DATA_DIR, "faqs.json")
INDEX_PATH = os.path.join(DATA_DIR, "faiss_index.bin")
META_PATH = os.path.join(DATA_DIR, "faqs_metadata.npy")


def embed_texts(texts: List[str]) -> np.ndarray:
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=texts,
    )
    vectors = [d.embedding for d in response.data]
    return np.array(vectors, dtype="float32")


def main():
    items = []

    if os.path.exists(DATA_PATH):
        faqs = load_faq_data(DATA_PATH)
        items.extend(faqs)
        print(f"Loaded {len(faqs)} FAQ items from faqs.json")

    if not items:
        raise RuntimeError("No data found to build index.")

    texts = [f"{item['question']}\n{item['answer']}" for item in items]

    print(f"Embedding {len(texts)} items...")
    embeddings = embed_texts(texts)

    dim = embeddings.shape[1]
    index = faiss.IndexFlatL2(dim)
    index.add(embeddings)

    os.makedirs(os.path.dirname(INDEX_PATH), exist_ok=True)
    faiss.write_index(index, INDEX_PATH)

    meta = np.array(
        [
            {
                "question": item["question"],
                "answer": item["answer"],
                "source": item.get("source", "faqs.json"),
            }
            for item in items
        ],
        dtype=object,
    )
    np.save(META_PATH, meta)

    print(f"Index built and saved to {INDEX_PATH}")


if __name__ == "__main__":
    main()
