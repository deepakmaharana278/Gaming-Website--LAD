from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import feedparser
import time
import os
import json
from .models import *
from django.http import JsonResponse


CACHE = {
    "data": None,
    "time": 0
}


FEED_URL = os.getenv("GAMEMONETIZE_FEED_URL")

def health_check(request):
    return JsonResponse({"status": "ok"})

def detect_platform(entry):
    text = (
        entry.get("title", "") +
        entry.get("description", "") +
        entry.get("instructions", "") +
        " ".join([t.term for t in entry.tags] if "tags" in entry else [])
    ).lower()

    url = entry.get("url", "").lower()

    if "android" in text or "apk" in text or "play.google" in url:
        return "android"

    if "ios" in text or "iphone" in text or "ipad" in text or "apple" in url:
        return "ios"

    return "desktop"



def gamemonetize_games(request):
    now = time.time()

    # 30 min cache
    if CACHE["data"] and now - CACHE["time"] < 1800:
        return JsonResponse(CACHE["data"], safe=False)

    feed = feedparser.parse(FEED_URL)

    games = []

    for entry in feed.entries:
        games.append({
            "id": entry.id if "id" in entry else "",
            "title": entry.title,
            "description": entry.description,
            "instructions": entry.get("instructions", ""),
            "category": entry.get("category", ""),
            "tags": [t.term for t in entry.tags] if "tags" in entry else [],
            "url": entry.get("url", ""),
            "thumb": entry.get("thumb", ""),
            "platform": detect_platform(entry),   
        })


    CACHE["data"] = games
    CACHE["time"] = now

    return JsonResponse(games, safe=False)

@csrf_exempt
def save_user(request):

    if request.method != "POST":
        return JsonResponse({"error": "POST only"}, status=405)

    data = json.loads(request.body)
    user, created = User.objects.get_or_create(
        firebase_uid=data["uid"],
        defaults={
            "name": data.get("name", ""),
            "email": data.get("email", ""),
            "photo": data.get("photo", ""),
        }
    )

    return JsonResponse({"status": "ok"})


def get_user(request, uid):
    try:
        user = User.objects.get(firebase_uid=uid)
        return JsonResponse({
            "status": "ok",
            "user": {
                "name": user.name,
                "email": user.email,
                "photo": user.photo,
                "joined_at": user.joined_at.strftime("%Y-%m-%d"),
            }
        })
    except User.DoesNotExist:
        return JsonResponse(
            {"status": "error", "message": "User not found"},
            status=404
        )

