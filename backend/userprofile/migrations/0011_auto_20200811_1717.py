# Generated by Django 2.2.12 on 2020-08-11 21:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0007_auto_20200806_2241'),
        ('userprofile', '0010_auto_20200811_1705'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='favorite',
            name='favorites',
        ),
        migrations.AddField(
            model_name='favorite',
            name='favorites',
            field=models.ManyToManyField(to='recipe.Recipe'),
        ),
    ]
