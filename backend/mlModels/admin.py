from django.contrib import admin
from .models import TwitterModel, FbModel, Train
# Register your models here.

admin.site.register(TwitterModel)
admin.site.register(FbModel)
admin.site.register(Train)