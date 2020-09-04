from rest_framework import serializers
from recipe.models import Recipe
from django.contrib.auth.models import User


class RecipeSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    class Meta:
        model = Recipe
        fields = [
            'id',
            'title',
            'author',
            'username',
            'cooktime',
            'ingredients',
            'directions',
            'picture']
    
    def get_username(self, obj):
        return obj.author.username
