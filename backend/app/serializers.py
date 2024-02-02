from rest_framework import serializers
from .models import Book, Author

class BookSerializer(serializers.ModelSerializer):
    authors = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
     )
    isbn = serializers.SerializerMethodField()

    def get_isbn(self, obj):
        # Sprawdzenie, czy obiekt ISBN istnieje i zwrócenie numeru ISBN lub None
        return obj.isbn.isbn_number if obj.isbn else None

    class Meta:
        model = Book
        fields = ['id', 'title', 'publicationYear', 'genre', 'stock', 'image', 'authors', 'isbn']


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['name']