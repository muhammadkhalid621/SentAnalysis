from django.db import models
import uuid
from django.conf import settings

# Create your models here.


class Twitter_Scrapper(models.Model):
    search = models.ForeignKey(
        'accounts.UserAccount', on_delete=models.CASCADE)
    # search_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    search_word = models.CharField(max_length=50)
    # search_word_file = models.FileField(null=False)
    tweetCount = models.CharField(max_length=50)
    start = models.DateField()
    end = models.DateField()
    email = models.EmailField()
    username = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

class Twitter_Scrapper_Location(models.Model):
    search = models.ForeignKey(
        'accounts.UserAccount', on_delete=models.CASCADE)
    # search_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    search_word = models.CharField(max_length=50)
    # search_word_file = models.FileField(null=False)
    tweetCount = models.CharField(max_length=50)
    start = models.DateField()
    end = models.DateField()
    location = models.CharField(max_length=50)
    radius = models.CharField(max_length=50)
    email = models.EmailField()
    username = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

class Fb_scrapper_pages(models.Model):
    search = models.ForeignKey(
        'accounts.UserAccount', on_delete=models.CASCADE)
    page_name = models.CharField(max_length=500)
    PostCount_page = models.CharField(max_length=50)
    email = models.EmailField()
    username = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

class Fb_scrapper_post(models.Model):
    search = models.ForeignKey(
        'accounts.UserAccount', on_delete=models.CASCADE)
    url_post = models.CharField(max_length=500)
    email = models.EmailField()
    username = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

class Fb_scrapper_comments(models.Model):
    search = models.ForeignKey(
        'accounts.UserAccount', on_delete=models.CASCADE)
    url_comments = models.CharField(max_length=500)
    email = models.EmailField()
    username = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

class Fb_scrapper_groups(models.Model):
    search = models.ForeignKey(
        'accounts.UserAccount', on_delete=models.CASCADE)
    group_name = models.CharField(max_length=500)
    PostCount_group = models.CharField(max_length=50)
    email = models.EmailField()
    username = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
