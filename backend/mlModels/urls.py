from django.urls import path, re_path
from .views import TwitterModelView, FbModelView, TrainModel, getFilesID, model_train_files, DownloadPDF, DownloadPDF_client, twitter_predict_client, fb_predict_client
from django.views.generic import TemplateView

urlpatterns = [
    path('twitter-model/', TwitterModelView),
    path('fb-model/', FbModelView),
    path('train/', TrainModel),
    path('filesid/', getFilesID),
    path('model-files/', model_train_files),
    # path('download/', DownloadPDF),
    # path('download-files/', DownloadPDF_client),
    path('predict-twitter/', twitter_predict_client),
    path('predict-fb/', fb_predict_client),


]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]