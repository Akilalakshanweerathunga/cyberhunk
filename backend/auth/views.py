from django.shortcuts import redirect
from django.http import JsonResponse
from django.conf import settings
from urllib.parse import urlencode
import requests

FB_AUTH_URL = "https://www.facebook.com/v19.0/dialog/oauth"
FB_TOKEN_URL = "https://graph.facebook.com/v19.0/oauth/access_token"
FB_GRAPH_URL = "https://graph.facebook.com/v19.0/me"

def facebook_login(request):
    redirect_uri = f"{settings.BASE_URL}/auth/facebook/callback/"
    return redirect(
        f"{FB_AUTH_URL}?client_id={settings.FB_APP_ID}&redirect_uri={redirect_uri}&scope=email,public_profile,user_posts"
    )

def facebook_callback(request):
    code = request.GET.get("code")
    redirect_uri = f"{settings.BASE_URL}/auth/facebook/callback/"
    
    token_response = requests.get(FB_TOKEN_URL, params={
        "client_id": settings.FB_APP_ID,
        "redirect_uri": redirect_uri,
        "client_secret": settings.FB_APP_SECRET,
        "code": code
    })
    access_token = token_response.json().get("access_token")

    user_data = requests.get(f"{FB_GRAPH_URL}?fields=id,name,email&access_token={access_token}").json()

    query = urlencode({'token': access_token})
    return redirect(f"http://localhost:3000/dashboard?{query}")
