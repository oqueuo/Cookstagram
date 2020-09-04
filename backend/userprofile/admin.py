from django.contrib import admin
from userprofile.models import Friend, Favorite
from recipe.models import Recipe

# Register your models here.
admin.site.register(Friend)
admin.site.register(Favorite)