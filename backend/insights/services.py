import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
from googletrans import Translator
from joblib import load

# ML Libraries
from sklearn.pipeline import Pipeline

# One-time setup
nltk.download('vader_lexicon')
sia = SentimentIntensityAnalyzer()
translator = Translator()

# Load trained ML model
try:
    model = load('insights/sentiment_model.pkl')  # path is relative to manage.py
    use_ml_model = True
except:
    model = None
    use_ml_model = False


def translate_text(text):
    try:
        translated = translator.translate(text, src='si', dest='en')
        return translated.text
    except Exception as e:
        return text  # fallback


def analyze_text(text, method='nltk'):
    """
    Analyze Sinhala or English text with optional method:
    method='nltk' or method='ml'
    """
    translated = translate_text(text)

    if method == 'ml' and use_ml_model:
        label = model.predict([translated])[0]
        return {
            "original": text,
            "translated": translated,
            "label": label
        }

    # Default NLTK scoring
    score = sia.polarity_scores(translated)
    label = 'positive' if score['compound'] > 0.2 else 'negative' if score['compound'] < -0.2 else 'neutral'

    return {
        "original": text,
        "translated": translated,
        "score": score,
        "label": label
    }
