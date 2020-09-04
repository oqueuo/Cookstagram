from django.conf import settings
from django.db import models
from recipe.models import Recipe
from django.contrib.auth.models import User

class Favorite(models.Model):
    user = models.OneToOneField(User, related_name='favorites', on_delete=models.CASCADE)
    favorites = models.ManyToManyField(Recipe)
    def __str__(self):
        return "%s's favorites" % self.user

class Friend(models.Model):
    users = models.ManyToManyField(User, related_name='users')
    current_user = models.ForeignKey(User, related_name='owner', null=True, on_delete=models.CASCADE)

    def __str__(self):
        return "%s's friends" % self.current_user

    @classmethod
    def make_friend(cls, current_user, new_friend):
        friend, created = cls.objects.get_or_create(
            current_user=current_user
        )
        friend.users.add(new_friend)

    @classmethod
    def lose_friend(cls, current_user, new_friend):
        friend, created = cls.objects.get_or_create(
            current_user=current_user
        )
        friend.users.remove(new_friend)
