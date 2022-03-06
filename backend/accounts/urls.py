from django.urls import path, include, re_path
# from .views import GetUserProfileView, UpdateUserProfileView
from .views import getUserProfile
from django.views.generic import TemplateView

urlpatterns = [
    #gets all user profiles and create a new profile
#     path("all-profiles",UserProfileListCreateView.as_view(),name="all-profiles"),
#    # retrieves profile details of the currently logged in user
    path("profile/",getUserProfile,name="profile"),
    # path('user', GetUserProfileView.as_view(), name="users-profile"),
    # path('update', UpdateUserProfileView.as_view(), name="users-profile-update"),
    path('', include('djoser.urls')),
    path('', include('djoser.urls.jwt')),
    path('', include('djoser.urls.authtoken')),
]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]