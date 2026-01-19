from django.db import models

# Create your models here.
class User(models.Model):
    firebase_uid = models.CharField(max_length=200, unique=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    photo = models.TextField(blank=True)
    joined_at = models.DateTimeField(auto_now_add=True)
