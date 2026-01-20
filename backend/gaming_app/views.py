from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import feedparser
import time
import os
import json
from .models import *
from django.http import JsonResponse
from datetime import timedelta
from django.db.models import Count
from django.utils.timezone import now


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


@csrf_exempt
def save_game_play(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST only"}, status=405)

    data = json.loads(request.body)

    user = User.objects.get(firebase_uid=data["uid"])

    GamePlay.objects.create(
        user=user,
        game_name=data["game_name"]
    )

    return JsonResponse({"status": "saved"})


# Dashboard stats
def dashboard_stats(request, uid):
    user = User.objects.get(firebase_uid=uid)

    # Total games played (all time)
    total_games = GamePlay.objects.filter(user=user).count()

    # Most played game
    most_played = (
        GamePlay.objects
        .filter(user=user)
        .values("game_name")
        .annotate(count=Count("id"))
        .order_by("-count")
        .first()
    )

    # Last game played
    last_game = (
        GamePlay.objects
        .filter(user=user)
        .order_by("-played_at")
        .first()
    )

    # Level logic (last 30 days)
    last_30_days = now() - timedelta(days=30)
    recent_games = GamePlay.objects.filter(
        user=user,
        played_at__gte=last_30_days
    ).count()


    GAMES_PER_LEVEL = 5
    level = (recent_games // GAMES_PER_LEVEL) + 1

    return JsonResponse({
        "status": "ok",
        "stats": {
            "total_games": total_games,
            "most_played": most_played["game_name"] if most_played else None,
            "last_game": last_game.game_name if last_game else None,
            "level": level,
            "recent_games": recent_games,  
            "games_per_level": GAMES_PER_LEVEL,
            "favorite_game": user.favorite_game,
        }
    })


@csrf_exempt
def set_favorite_game(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST only"}, status=405)

    data = json.loads(request.body)
    user = User.objects.get(firebase_uid=data["uid"])

    # If game_name is empty or null → remove favorite
    game_name = data.get("game_name")

    if game_name:
        user.favorite_game = game_name
    else:
        user.favorite_game = None

    user.save()

    return JsonResponse({
        "status": "ok",
        "favorite_game": user.favorite_game
    })
