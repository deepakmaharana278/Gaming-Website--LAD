from django.urls import path
from .views import *

urlpatterns = [
    path("games/", gamemonetize_games),
    path("save-user/", save_user),
    path("get-user/<str:uid>/", get_user),
    path("health/",health_check),
]
