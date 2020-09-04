from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('login', index),  # added
    path('register', index),  # added
    # path('edit/<int:pk>', TodoDetailView.as_view()),
    # path('delete/<int:pk>', TodoDetailView.as_view()),
]