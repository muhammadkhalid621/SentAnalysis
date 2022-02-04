from django.db import models

# Create your models here.

class SearchWord(models.Model):
    search_word = models.CharField(max_length=50)
    email = models.EmailField()
    username = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    