from django import forms
from .models import Recipe

class RecipeForm(forms.ModelForm):
    class Meta:
        model = Recipe
        fields = ('title',
                  'cooktime',
                  'ingredients',
                  'directions',
                  'picture')
