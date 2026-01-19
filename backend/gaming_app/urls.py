from django.urls import path
from .views import *

urlpatterns = [
    path("games/", gamemonetize_games),
    path("health/",health_check),
]
