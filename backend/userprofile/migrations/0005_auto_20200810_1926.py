# Generated by Django 3.1 on 2020-08-10 23:26

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0007_auto_20200806_2241'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('userprofile', '0004_auto_20200810_1924'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Userprofile',
            new_name='Favorites',
        ),
    ]
