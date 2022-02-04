from django.db import models
from django.conf import settings

# Create your models here.


class FileUpload(models.Model):
    options = [
        ('Prediction', 'Run Predictions'),
        ('Train', 'Training the models'),
    ]
    # user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,)
    File = models.FileField(null=False)
    option = models.CharField(max_length=50, choices=options, null=False)
    email = models.EmailField()
    username = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
