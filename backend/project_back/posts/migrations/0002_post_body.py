# Generated by Django 5.0.3 on 2024-04-24 10:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='body',
            field=models.TextField(default='Empty', max_length=3300),
        ),
    ]