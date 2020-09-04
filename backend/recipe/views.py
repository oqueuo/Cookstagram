"""
Included views:

recipe_list: renders the recipes matching the logged in user.
recipe_new: Allows user to create a new recipe
recipe_edit: Allows user to edit recipe
reipc_remove: Allows user to delete recipe
"""
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

@login_required
def recipe_new(request):
    if request.method == "POST":
        form = RecipeForm(request.POST, request.FILES)
        if form.is_valid():
            recipe = form.save(commit=False)
            recipe.author = request.user
            recipe.published_date = timezone.now()
            recipe.save()
            return redirect('userprofile:view_profile')
    else:
        form = RecipeForm()
    return render(request, 'userprofile/recipe_edit.html', {'form': form})

def recipe_edit(request, pk):
    recipe = get_object_or_404(Recipe, pk=pk)
    if request.method == "POST":
        form = RecipeForm(request.POST, instance=recipe)
        if form.is_valid():
            recipe = form.save(commit=False)
            recipe.author = request.user
            recipe.published_date = timezone.now()
            recipe.save()
            return redirect('userprofile:view_profile')
    else:
        form = RecipeForm(instance=recipe)
    return render(request, 'userprofile/recipe_edit.html', {'form': form})

def recipe_remove(request, pk):
    recipe = get_object_or_404(Recipe, pk=pk)
    recipe.delete()
    return redirect('userprofile:view_profile')


### Add and remove Favorites
def add_favorite(request, pk):
    user_favorites, created = Favorite.objects.get_or_create(
        user=request.user
        )
    recipe = get_object_or_404(Recipe, pk=pk)
    user_favorites.favorites.add(recipe)

def remove_favorite(request, pk):
    user_favorites, created = Favorite.objects.get_or_create(
        user=request.user
        )
    recipe = get_object_or_404(Recipe, pk=pk)
    user_favorites.favorites.remove(recipe)
    