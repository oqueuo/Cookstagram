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
from django.urls import path, include
from knox.views import LogoutView
from userprofile.views import UserDetail
from .views import RegisterDetail, LoginDetail

urlpatterns = [
    # path('accounts/login/', views_stock.LoginView.as_view(), name='login'),
    # path('accounts/logout/', views_stock.LogoutView.as_view(next_page='/'), name='logout'),
    # path('accounts/register/', views.register, name='register')
    path('', include('knox.urls')),
    path('user', UserDetail.as_view()),
    path('register', RegisterDetail.as_view()),
    path('login', LoginDetail.as_view()),
    path('logout', LogoutView.as_view(), name='knox_logout')
]
