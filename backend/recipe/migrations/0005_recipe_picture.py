# Generated by Django 2.2.12 on 2020-08-06 23:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0004_recipe_cooktime'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='picture',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]
