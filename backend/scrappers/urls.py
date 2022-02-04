from django.urls import path, re_path
from .views import TwitterScrapperView
from django.views.generic import TemplateView

urlpatterns = [
    path('twitter_scrapper/', TwitterScrapperView),
]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]