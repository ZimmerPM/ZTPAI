# Generated by Django 4.2.7 on 2023-12-22 17:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='book',
            old_name='publication_year',
            new_name='publicationYear',
        ),
    ]
