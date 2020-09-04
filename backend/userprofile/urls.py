"""appmain URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from django.conf.urls import url
from . import views
from django.views.generic.base import RedirectView
from rest_framework.urlpatterns import format_suffix_patterns

app_name = 'userprofile'

urlpatterns = [
    path('profile/<int:pk>/', views.OtherUserDetail.as_view()), #includes favorites, and friends' recipes for the feed
    path('profile/<int:pk>/favorites/', views.UserFavoriteList.as_view()),
    path('profile/<int:pk>/friends/', views. UserFriendsList.as_view()),
    path('profile/search/<str:query>/', views. UserSearchList.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)
