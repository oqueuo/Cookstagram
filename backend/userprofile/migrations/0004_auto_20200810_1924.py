# Generated by Django 3.1 on 2020-08-10 23:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0007_auto_20200806_2241'),
        ('userprofile', '0003_auto_20200810_1923'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='favorites',
            field=models.ManyToManyField(related_name='favorites', to='recipe.Recipe'),
        ),
    ]
