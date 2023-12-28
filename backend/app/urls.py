from django.urls import path
from .views import BookList, BookCreate

urlpatterns = [
    path('books/', BookList.as_view(), name='book-list'),
    path('addBook/', BookCreate.as_view(), name='book-create'),
]
