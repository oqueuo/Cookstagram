from django.conf import settings
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from PIL import Image


def upload_path(instance, filename):
    return '/'.join(['pictures', str(instance.title), filename])

class Recipe(models.Model):
    author = models.ForeignKey(User, related_name="recipes",  on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=200)
    cooktime = models.TextField()
    ingredients = models.TextField()
    directions = models.TextField()
    created_date = models.DateTimeField(default=timezone.now)
    published_date = models.DateTimeField(blank=True, null=True)
    picture = models.ImageField(blank=True, null=True, upload_to=upload_path)

    def publish(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title
