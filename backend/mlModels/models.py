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

def handle_uploaded_file_train(instance, filename):
    # now = datetime.now()
    # time = now.strftime("%H:%M:%S")
    code = code_generate(10)
    print('filename', filename)
    a = filename.split('.')[-1]
    b = filename.split('.')[0]
    extension = "." + a
    filename_reformat = b + '_' + code + extension

    return os.path.join(str(settings.MEDIA_ROOT) + '/train_dataset',filename_reformat)

def handle_uploaded_file_predict(instance, filename):
    # now = datetime.now()
    # time = now.strftime("%H:%M:%S")
    code = code_generate(10)
    print('filename', filename, instance.File)
    a = filename.split('.')[-1]
    b = filename.split('.')[0]
    print(a, b)
    extension = "." + a
    filename_reformat = b + '_' + code + extension
    print(os.path.join(str(settings.MEDIA_ROOT) + '/predict_dataset',filename))
    x_path = '{0}\{1}\{2}'.format(settings.MEDIA_ROOT,'predict_dataset', instance.File)
    print(x_path)
    # return os.path.join(str(settings.MEDIA_ROOT) + '/predict_dataset',filename_reformat)
    return x_path
def hello(instance, file_name):
    x_path = '{0}\{1}\{2}'.format(settings.MEDIA_ROOT,'predict_dataset', instance.File)
    return x_path

class TwitterModel(models.Model):
    options = [
        ('Prediction', 'Run Predictions'),
        ('Report', 'Generate Report'),
        ('Both', 'Run Predictions & Generate Report'),
    ]
   

    # user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,)
    File = models.FileField(null=False, upload_to='dataset/twitter_model')
    code = models.CharField(max_length=15, null=False)
    option = models.CharField(max_length=50, choices=options, null=False)
    email = models.EmailField()
    username = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

class FbModel(models.Model):

    # user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,)
    File = models.FileField(null=False, upload_to='dataset/fb_model')
    code = models.CharField(max_length=15, null=False)
    email = models.EmailField()
    username = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

class twitterModel_Client(models.Model):
    
    # user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,)
    File = models.FileField(null=False, upload_to='predict_dataset')
    code = models.CharField(max_length=15, null=False)
    email = models.EmailField()
    username = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

class FbModel_Client(models.Model):
    
    # user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,)
    File = models.FileField(null=False, upload_to='predict_dataset')
    code = models.CharField(max_length=15, null=False)
    email = models.EmailField()
    username = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

class Train(models.Model):
    # user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,)
    File = models.FileField(null=False, upload_to='dataset/train')
    email = models.EmailField()
    username = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)


class ModeleTrainingFiles(models.Model):
    weight_sarcasm = models.FileField(max_length=255, null=True, blank=True)
    weight_sentiment = models.FileField(max_length=255,null=True, blank=True)
    sarcasm_Model = models.FileField(max_length=255,null=True, blank=True)
    sentiment_Model = models.FileField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)