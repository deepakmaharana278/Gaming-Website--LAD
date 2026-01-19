from django.http import JsonResponse
import feedparser, time, os
from .helpers import filter_games_by_platform

CACHE = {
    "data": None,
    "time": 0
}

FEED_URL = os.getenv("GAMEMONETIZE_FEED_URL")

def gamemonetize_games(request):
    now = time.time()
    platform = request.GET.get("platform")   # 👈 from frontend

    # 30 min cache
    if CACHE["data"] and now - CACHE["time"] < 1800:
        filtered = filter_games_by_platform(CACHE["data"], platform)
        return JsonResponse(filtered, safe=False)

    feed = feedparser.parse(FEED_URL)

    games = []

    for entry in feed.entries:
        width = int(entry.get("width", 0)) if entry.get("width") else 0
        platform_name = "Android" if width and width <= 480 else "Desktop"

        games.append({
            "id": entry.id if "id" in entry else "",
            "title": entry.title,
            "description": entry.description,
            "instructions": entry.get("instructions", ""),
            "category": entry.get("category", ""),
            "tags": [t.term for t in entry.tags] if "tags" in entry else [],
            "url": entry.get("url", ""),
            "thumb": entry.get("thumb", ""),
            "platform": platform_name
        })

    CACHE["data"] = games
    CACHE["time"] = now

    filtered = filter_games_by_platform(games, platform)
    return JsonResponse(filtered, safe=False)
