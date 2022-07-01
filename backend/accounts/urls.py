from django.urls import path, include, re_path
# from .views import GetUserProfileView, UpdateUserProfileView
from .views import getClients, downloadClients, taskUpload, getEmails, getTask, updateTask, Suspend, send_mail, getTaskDetails, change_pass
from django.views.generic import TemplateView

urlpatterns = [
    #gets all user profiles and create a new profile
#     path("all-profiles",UserProfileListCreateView.as_view(),name="all-profiles"),
#    # retrieves profile details of the currently logged in user
    # path("profile/",getUserProfile,name="profile"),
    path("clients/",getClients,name="clients"),
    path("downloadClients/",downloadClients,name="downloadClients"),
    path("taskUpload/",taskUpload,name="taskUpload"),
    path("getEmails/",getEmails,name="getEmails"),
    path("getTask/",getTask,name="getTask"),
    path('task-update/<str:pk>/', updateTask, name="task-update"),
    path('suspend/<str:pk>/', Suspend, name="suspend"),
    path('send-email/', send_mail, name="send-email"),
    path('task-details/', getTaskDetails, name="task-details"),
    path('change-pass/', change_pass, name="change-pass"),
    # path('user', GetUserProfileView.as_view(), name="users-profile"),
    # path('update', UpdateUserProfileView.as_view(), name="users-profile-update"),
    path('', include('djoser.urls')),
    path('', include('djoser.urls.jwt')),
    path('', include('djoser.urls.authtoken')),
]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]