from django.http import JsonResponse
from .services import analyze_text
import requests

def analyze_facebook(request):
    token = request.GET.get('token')
    method = request.GET.get('method', 'nltk')  # ?method=ml for ML-based analysis

    if not token:
        return JsonResponse({"error": "Token missing"}, status=400)

    insights = []
    next_url = f"https://graph.facebook.com/v19.0/me/posts?fields=message,comments&limit=10&access_token={token}"

    while next_url:
        try:
            res = requests.get(next_url).json()
            posts = res.get("data", [])

            for post in posts:
                if 'message' in post:
                    insights.append(analyze_text(post['message'], method=method))

                # Handle comments in each post
                comments = post.get("comments", {}).get("data", [])
                for comment in comments:
                    if 'message' in comment:
                        insights.append(analyze_text(comment['message'], method=method))

            # Facebook pagination
            next_url = res.get("paging", {}).get("next")

        except Exception as e:
            return JsonResponse({"error": "Failed to fetch or process Facebook data", "details": str(e)}, status=500)

    return JsonResponse({"insights": insights})
