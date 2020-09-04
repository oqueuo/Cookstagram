from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('login', index),  # added
    path('register', index),  # added
]