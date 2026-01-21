from django.db import models

# Create your models here.
class User(models.Model):
    firebase_uid = models.CharField(max_length=200, unique=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    photo = models.TextField(blank=True)
    joined_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name


class GamePlay(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    game_name = models.CharField(max_length=100)
    play_duration = models.IntegerField(default=0) 
    played_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.name} - {self.game_name}"

class FavoriteGame(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="favorites")
    game_name = models.CharField(max_length=100)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "game_name")

    def __str__(self):
        return f"{self.user.name} ❤️ {self.game_name}"
