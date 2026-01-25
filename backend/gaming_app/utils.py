import requests
import feedparser
import re
import os

FEED_URL = os.getenv("GAMEMONETIZE_FEED_URL")

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    "Referer": "https://ladgames.online",
}

def slugify(text):
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")

def fetch_games():
    res = requests.get(FEED_URL, headers=HEADERS, timeout=30)

    if res.status_code != 200 or not res.text.strip():
        return []

    # 🔥 KEY FIX: parse the response CONTENT, not the URL
    feed = feedparser.parse(res.content)

    games = []

    for entry in feed.entries:
        title = entry.get("title", "").strip()
        if not title:
            continue

        games.append({
            "title": title,
            "slug": slugify(title),
            "category": entry.get("category", ""),
            "iframe": entry.get("link", ""),
            "description": entry.get("description", ""),
        })

    return games
