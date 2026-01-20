from django.urls import path
from .views import *

urlpatterns = [
    path("games/", gamemonetize_games),
    path("save-user/", save_user),
    path("get-user/<str:uid>/", get_user),
    path("save-game-play/", save_game_play),
    path("set-favorite-game/", set_favorite_game),
    path("dashboard-stats/<str:uid>/", dashboard_stats),
    path("health/",health_check),
]
