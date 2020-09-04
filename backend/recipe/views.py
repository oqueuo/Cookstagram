from django.utils import timezone
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Recipe
from .forms import RecipeForm
from userprofile.models import Favorite
from django.contrib.auth.models import User
from recipe.serializers import RecipeSerializer
from rest_framework import generics, viewsets

class RecipeList(generics.ListCreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
class RecipeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    