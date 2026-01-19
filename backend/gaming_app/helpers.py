def filter_games_by_platform(games, platform):
    if platform and platform.lower() != "all":
        return [g for g in games if g["platform"].lower() == platform.lower()]
    return games
