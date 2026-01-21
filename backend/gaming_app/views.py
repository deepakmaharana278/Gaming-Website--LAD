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

    play_duration = int(data.get("play_duration", 0))

    # Do not save if less than 2 minutes
    if play_duration < 120:
        return JsonResponse({
            "status": "ignored",
            "reason": "Play time less than 2 minutes"
        })

    GamePlay.objects.create(
        user=user,
        game_name=data["game_name"],
        play_duration=play_duration
    )

    return JsonResponse({"status": "saved"})

def calculate_level_and_progress(total_games):
    level = 0
    games_needed = 5

    while total_games >= games_needed:
        total_games -= games_needed
        level += 1
        games_needed = (level + 1) * games_needed

    return {
        "level": level,
        "current_level_games": total_games,
        "games_needed": games_needed
    }



# Dashboard stats
def dashboard_stats(request, uid):
    user = User.objects.get(firebase_uid=uid)

    total_games = GamePlay.objects.filter(
        user=user,
        play_duration__gte=120
    ).count()

    most_played = (
        GamePlay.objects
        .filter(user=user, play_duration__gte=120)
        .values("game_name")
        .annotate(count=Count("id"))
        .order_by("-count")
        .first()
    )

    last_game = (
        GamePlay.objects
        .filter(user=user)
        .order_by("-played_at")
        .first()
    )

    last_30_days = now() - timedelta(days=30)
    recent_games = GamePlay.objects.filter(
        user=user,
        played_at__gte=last_30_days,
        play_duration__gte=120
    ).count()

    level_data = calculate_level_and_progress(recent_games)
    favorite_games = list(
    FavoriteGame.objects.filter(user=user)
    .values_list("game_name", flat=True)
    )

    # Get full game data from feed cache
    games_feed = CACHE.get("data") or []
    favorite_game_cards = [
        g for g in games_feed if g["title"] in favorite_games
    ]
    

    return JsonResponse({
        "status": "ok",
        "stats": {
            "total_games": total_games,
            "most_played": most_played["game_name"] if most_played else None,
            "last_game": last_game.game_name if last_game else None,

            "level": level_data["level"],
            "current_level_games": level_data["current_level_games"],
            "games_needed": level_data["games_needed"],
            "recent_games": recent_games,
            "favorite_games": favorite_games,
            "favorite_game_cards": favorite_game_cards,
        }
    })


@csrf_exempt
def toggle_favorite_game(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST only"}, status=405)

    data = json.loads(request.body)
    user = User.objects.get(firebase_uid=data["uid"])
    game_name = data.get("game_name")

    if not game_name:
        return JsonResponse({"error": "Game name required"}, status=400)


    fav = FavoriteGame.objects.filter(
        user=user,
        game_name=game_name
    )

    if fav.exists():
        fav.delete()
        return JsonResponse({"status": "removed"})
    else:
        FavoriteGame.objects.create(
            user=user,
            game_name=game_name
        )
        return JsonResponse({"status": "added"})
