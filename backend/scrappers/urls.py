from django.urls import path, re_path
from .views import TwitterScrapperView, TwitterScrapperLocationView, DownloadPDF_Twitter, FacebookPostScrapperView, FacebookPageScrapperView, FacebookGroupsScrapperView, FacebookCommentsScrapperView, DownloadPDF_Facebook
from django.views.generic import TemplateView

urlpatterns = [
    path('twitter_scrapper/', TwitterScrapperView),
    path('twitter_scrapper_location/', TwitterScrapperLocationView),
    path('facebook_scrapper_page/', FacebookPageScrapperView),
    path('facebook_scrapper_post/', FacebookPostScrapperView),
    path('facebook_scrapper_comments/', FacebookCommentsScrapperView),
    path('facebook_scrapper_groups/', FacebookGroupsScrapperView),
    path('download-twitter/', DownloadPDF_Twitter),
    path('download-facebook/', DownloadPDF_Facebook),
]

urlpatterns += [re_path(r'^.*',
                        TemplateView.as_view(template_name='index.html'))]
