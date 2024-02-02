from django.urls import path
from .views import BookList, BookCreate, BookDelete, AuthorCreate


urlpatterns = [
    path('books/', BookList.as_view(), name='book-list'),
    path('addBook/', BookCreate.as_view(), name='book-create'),
    path('books/delete/<int:pk>/', BookDelete.as_view(), name='book-delete'),
    path('authors/', AuthorCreate.as_view(), name='author-create'),
]
