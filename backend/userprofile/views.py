from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.db.models.functions import Lower
from django.shortcuts import render, redirect, get_object_or_404

from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.filters import SearchFilter, OrderingFilter

from recipe.models import Recipe
from recipe.serializers import RecipeSerializer
from userprofile.models import Friend, Favorite
from .serializers import UserSerializer, OtherUserSerializer, FriendSerializer, UserFavoritesSerializer, UserSearchSerializer

import json

# API Views
# class UserDetail(generics.RetrieveAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

class UserDetail(generics.RetrieveAPIView):
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = UserSerializer
    def get_object(self):
        return self.request.user

class OtherUserDetail(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = OtherUserSerializer

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    

class UserFavoriteList(generics.ListCreateAPIView):
    serializer_class = RecipeSerializer
    all_favorites = Favorite.objects.all()
    
    def get_queryset(self):
        user = User.objects.get(id=self.kwargs['pk'])
        favorites_obj = get_object_or_404(self.all_favorites, user=user)
        return favorites_obj.favorites.all()
        
    def post(self, request, pk):
        user = User.objects.get(id=pk)
        favorites_obj = get_object_or_404(self.all_favorites, user=user)
        recipe = Recipe.objects.get(id=request.data['recipe_id'])
        if favorites_obj:
            favorites_obj.favorites.add(recipe)
        return Response(json.dumps({}))
    
    def delete(self, request, pk):
        user = User.objects.get(id=pk)
        favorites_obj = get_object_or_404(self.all_favorites, user=user)
        recipe = Recipe.objects.get(id=request.data['recipe_id'])
        if favorites_obj:
            favorites_obj.favorites.remove(recipe)
        return Response(json.dumps({}))

class UserFriendsList(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    all_users = Friend.objects.all()

    def get_queryset(self):
        user = User.objects.get(id=self.kwargs['pk'])
        friends_obj = Friend.objects.get_or_create(current_user=user)
        return friends_obj.users.all()
    
    def post(self, request, pk):
        user = User.objects.get(id=pk)
        friends_obj = Friend.objects.get_or_create(current_user=user)[0]
        friend = User.objects.get(id=request.data['other_user_id'])
        if friends_obj:
            friends_obj.users.add(friend)
        return Response(json.dumps({}))
    
    def delete(self, request, pk):
        user = User.objects.get(id=pk)
        friends_obj = Friend.objects.get_or_create(current_user=user)[0]
        friend = User.objects.get(id=request.data['other_user_id'])
        if friends_obj:
            friends_obj.users.remove(friend)
        return Response(json.dumps({}))

class UserSearchList(generics.ListAPIView):
    serializer_class = UserSearchSerializer
    
    def get_queryset(self):
        query = self.kwargs['query']
        queryset = User.objects.filter(username__contains=query)
        return queryset


# Grab Data for Serializers
def user_friends(obj):
    try:
        friend = Friend.objects.get(current_user=obj) # logged-in user object
        friends = friend.users.all()
    except:
        friends = None
        return []
    return friends

def user_recipes(obj):
    recipes = Recipe.objects.filter(author=obj.id).order_by(Lower('title'))
    return recipes

def friends_recipes(obj):
    try:
        friend = Friend.objects.get(current_user=obj) # logged-in user object
        friends = friend.users.all()
    except:
        friends = None
        return []
    recipes = Recipe.objects.filter(author__in=friends).order_by('published_date')
    return recipes

def user_favorites(obj):
    user_favorites, created = Favorite.objects.get_or_create(
        user=obj
        )
    favorite_recipes = obj.favorites.favorites.all()
    return favorite_recipes



















@login_required
def view_profile(request, pk=None):
    # If pk=None, show logged in user's profile. If pk selected, show that user's profile.
    users = User.objects.exclude(id=request.user.id)
    try:
        friend = Friend.objects.get(current_user=request.user) # logged-in user object
        friends = friend.users.all()
    except:
        friends = None
        
    if pk:
        user = User.objects.get(pk=pk)
        recipes = Recipe.objects.filter(author=user).order_by(Lower('title'))
    else:
        user = request.user
        recipes = Recipe.objects.filter(author=request.user).order_by(Lower('title'))

    args = {
        'recipes': recipes, 'users': users, 'friends': friends
    }
    return render(request, 'userprofile/recipe_list.html', args)















def change_friends(request, operation, pk):
    friend = User.objects.get(pk=pk)
    if operation == 'add':
        Friend.make_friend(request.user, friend)
    elif operation == 'remove':
        Friend.lose_friend(request.user, friend)
    return redirect('userprofile:view_profile')

# Add views to toggle between your own recipes and saved recipes.
def toggle_recipes(request):
    return(1)
