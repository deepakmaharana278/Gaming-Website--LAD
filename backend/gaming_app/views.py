from django.http import JsonResponse
import requests
import feedparser
import time
import os


CACHE = {
    "data": None,
    "time": 0
}


FEED_URL = os.getenv("GAMEMONETIZE_FEED_URL")

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
