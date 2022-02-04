from django.urls import path, re_path
from .views import ModelRunView
from django.views.generic import TemplateView

urlpatterns = [
    path('SentAModel/', ModelRunView),
]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]