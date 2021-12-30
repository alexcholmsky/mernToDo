from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer

def get_keywords(text: str):
    # n_gram = keyword where n_gram_range = (lower boundary of number of words, upper boundary)
    n_gram_range = (1, 4)

    # stop words are words that are presumed to be uniformative, ex. "like", "him", "the"
    stop_words = "english"

    # Extract candidate words/phrases
    # CountVectorizer is a sklearn function that converts words to vectors as per the Bag of Words analogy (frequency of words in text)
    count = CountVectorizer(ngram_range=n_gram_range,stop_words=stop_words).fit([text])
    all_candidates = count.get_feature_names()

    # CALCULATING BEST KEYWORD

    # Defining the BERT NLP Embedding model used
    # Encodes each word as a specific vector in relation to other words, values are determined through semantics learned by the BERT model
    model = SentenceTransformer('distilbert-base-nli-mean-tokens')
    text_embedding = model.encode([text])
    candidate_embeddings = model.encode(all_candidates)

    # Use cosine similarity between text and candidate to determine proximity, and therefore top candidates
    # Generate top 5 keywords
    top_k = 1
    distances = cosine_similarity(text_embedding, candidate_embeddings)
    keywords = [all_candidates[index] for index in distances.argsort()[0][-top_k:]]

    print(keywords)
    return(keywords)
