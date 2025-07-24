# insights/views.py
from django.http import JsonResponse
import logging

logger = logging.getLogger(__name__)

def analyze(request):
    token = request.GET.get('token')

    logger.debug(f"Received token: {token}")

    if not token or token == "None":
        return JsonResponse({'error': 'Token is required'}, status=400)

    # Simulate analysis logic (replace with real processing)
    result = {
        'message': 'Analysis successful',
        'token': token,
        'score': 87,
        'risk': 'low'
    }

    return JsonResponse(result, status=200)
