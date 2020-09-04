from rest_framework import serializers
from django.core import serializers as dj_serializers
from django.contrib.auth.models import User
from django.db.models.functions import Lower

from . import views
from .models import Friend, Favorite

from recipe.models import Recipe
from recipe.serializers import RecipeSerializer


class UserSerializer(serializers.ModelSerializer):
    friends = serializers.SerializerMethodField()
    user_recipes = serializers.SerializerMethodField()
    friends_recipes = serializers.SerializerMethodField()
    favorites = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'friends',
            'user_recipes',
            'friends_recipes',
            'favorites',
            ]

    def get_friends(self, obj):
        # return dj_serializers.serialize('json', views.user_friends(obj))
        try:
            friend = Friend.objects.get(current_user=obj) # logged-in user object
            friends = friend.users.all()
        except:
            friends = None
            return []
        friends_serializer = FriendSerializer(friends, many=True)
        return friends_serializer.data

    def get_user_recipes(self, obj):
        my_recipes = Recipe.objects.filter(author=obj.id).order_by(Lower('title'))
        recipe_serializer = RecipeSerializer(my_recipes, many=True)
        return recipe_serializer.data

    def get_friends_recipes(self, obj):
        try:
            friend = Friend.objects.get(current_user=obj)
            friends = friend.users.all()
        except:
            friends = None
            return []
        friends_recipes = Recipe.objects.filter(author__in=friends).order_by('published_date')
        recipe_serializer = RecipeSerializer(friends_recipes, many=True)
        return recipe_serializer.data

    def get_favorites(self, obj):
        user_favorites, created = Favorite.objects.get_or_create(user=obj)
        favorite_recipes = obj.favorites.favorites.all()
        recipe_serializer = RecipeSerializer(favorite_recipes, many=True)
        return recipe_serializer.data

class OtherUserSerializer(serializers.ModelSerializer):
    user_recipes = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'user_recipes',
            ]
    def get_user_recipes(self, obj):
        my_recipes = Recipe.objects.filter(author=obj.id).order_by(Lower('title'))
        recipe_serializer = RecipeSerializer(my_recipes, many=True)
        return recipe_serializer.data

class UserSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class UserFavoritesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = '__all__'


class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friend
        fields = '__all__'
