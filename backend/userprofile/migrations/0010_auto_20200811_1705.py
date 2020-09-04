# Generated by Django 2.2.12 on 2020-08-11 21:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0007_auto_20200806_2241'),
        ('userprofile', '0009_auto_20200811_0018'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='favorite',
            name='favorites',
        ),
        migrations.AddField(
            model_name='favorite',
            name='favorites',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='recipe.Recipe'),
        ),
    ]
