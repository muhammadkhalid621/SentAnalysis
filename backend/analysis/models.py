from django.db import models
from django.conf import settings
from datetime import datetime
import os
import random
import string
# Create your models here.

def code_generate(length):  # define the function and pass the length as argument
    # Print the string in Lowercase
    result = ''.join((random.choice(string.ascii_lowercase)
                     for x in range(length)))  # run loop until the define length
    print(" Random string generated in Lowercase: ", result)

    # Print the string in Uppercase
    result1 = ''.join((random.choice(string.ascii_uppercase)
                      for x in range(length)))  # run the loop until the define length
    return result1


class TwitterSNA(models.Model):
   
    # user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,)
    File = models.FileField(null=False, upload_to='dataset/twitter_sna')
    code = models.CharField(max_length=15, null=False)
    email = models.EmailField()
    username = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

class TwitterProfiling(models.Model):
   
    # user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,)
    File = models.FileField(null=False, upload_to='dataset/twitter_profiling')
    code = models.CharField(max_length=15, null=False)
    email = models.EmailField()
    username = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

class FbSNA(models.Model):
   
    # user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,)
    File = models.FileField(null=False, upload_to='dataset/fb_sna')
    code = models.CharField(max_length=15, null=False)
    email = models.EmailField()
    username = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

class FbProfiling(models.Model):
   
    # user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,)
    File = models.FileField(null=False, upload_to='dataset/fb_profiling')
    code = models.CharField(max_length=15, null=False)
    email = models.EmailField()
    username = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

class TwitterLogging(models.Model):
    File = models.FileField(null=True, blank=True)
    email = models.EmailField()
    username = models.CharField(max_length=50)
    updated_at = models.DateTimeField(auto_now_add=True)

class FbLogging(models.Model):
    File = models.FileField(null=False, upload_to='logs/facebook')
    email = models.EmailField()
    username = models.CharField(max_length=50)
    updated_at = models.DateTimeField(auto_now_add=True)