# app/management/commands/initgroups.py

from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from django.apps import apps

class Command(BaseCommand):
    help = 'Initializes the user groups and permissions.'

    def handle(self, *args, **kwargs):
        # Utworzenie grupy Admin
        admin_group, created = Group.objects.get_or_create(name='admin')
        if created:
            self.stdout.write(self.style.SUCCESS('Successfully created group "admin"'))
        else:
            self.stdout.write(self.style.WARNING('Group "admin" already exists'))

        # Utworzenie grupy User
        user_group, created = Group.objects.get_or_create(name='user')
        if created:
            self.stdout.write(self.style.SUCCESS('Successfully created group "user"'))
        else:
            self.stdout.write(self.style.WARNING('Group "user" already exists'))

        # Przypisanie uprawnień do grupy Admin
        for model in apps.get_models():
            ct = ContentType.objects.get_for_model(model)
            permissions = Permission.objects.filter(content_type=ct)
            admin_group.permissions.set(permissions)
            self.stdout.write(self.style.SUCCESS(f'All permissions added to group "admin" for {model._meta.model_name}'))

        # Przypisanie specyficznych uprawnień do grupy User
        book_ct = ContentType.objects.get_for_model(apps.get_model('app', 'Book'))
        permissions = Permission.objects.filter(content_type=book_ct, codename__startswith='view_')
        user_group.permissions.set(permissions)
        self.stdout.write(self.style.SUCCESS('View permissions added to group "user" for model Book'))
