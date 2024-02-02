from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Book, Author
from .serializers import BookSerializer
from django.shortcuts import get_object_or_404

class BookList(generics.ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BookCreate(generics.CreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def post(self, request, *args, **kwargs):
        authors_names = request.data.pop('authors', [])

        # Tworzenie książki
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            book = serializer.save()

            # Przypisywanie autorów do książki
            authors = []
            for author_name in authors_names:
                author, created = Author.objects.get_or_create(name=author_name)
                authors.append(author)
            book.authors.set(authors)  # Przypisanie autorów do książki

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BookDelete(generics.DestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def delete(self, request, *args, **kwargs):
        book = get_object_or_404(Book, pk=kwargs['pk'])
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)