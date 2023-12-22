from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Book
from .models import BookAuthor

admin.site.register(Book)
admin.site.register(BookAuthor)