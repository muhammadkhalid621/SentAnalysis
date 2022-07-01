from django.urls import path, re_path
from .views import twitterProfileView, twitterSNAView, fbSNAView, twitter_logs
from django.views.generic import TemplateView

urlpatterns = [
    path('twitter-sna/', twitterSNAView),
    path('twitter-profiling/', twitterProfileView),
    path('fb-sna/', fbSNAView),
    path('twitter-logs/', twitter_logs),


]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]