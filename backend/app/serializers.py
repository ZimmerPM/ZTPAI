from rest_framework import serializers
from .models import Book, Author, ISBN


class BookSerializer(serializers.ModelSerializer):
    authors = serializers.SlugRelatedField(
        queryset=Author.objects.all(),
        many=True,
        slug_field='name',
        required=False  # Opcjonalne, jeśli chcesz umożliwić tworzenie książek bez autorów
    )
    isbn = serializers.CharField(allow_blank=True, required=False)  # Zmienione na CharField

    class Meta:
        model = Book
        fields = ['id', 'title', 'publicationYear', 'genre', 'stock', 'image', 'authors', 'isbn']

    def create(self, validated_data):
        print("validated_data:", validated_data)  # Debugowanie danych wejściowych
        authors_data = validated_data.pop('authors', [])
        print("authors_data:", authors_data)  # Debugowanie danych autorów
        isbn_data = validated_data.pop('isbn', None)
        book = Book.objects.create(**validated_data)

        for author_name in authors_data:
            author, created = Author.objects.get_or_create(name=author_name)
            print(f"Author: {author_name}, Created: {created}")  # Debugowanie tworzenia autorów
            book.authors.add(author)

        if isbn_data:
            isbn_instance, _ = ISBN.objects.get_or_create(isbn_number=isbn_data)
            book.isbn = isbn_instance
            book.save()

        return book

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        # Aktualizuj inne pola podobnie
        authors_data = validated_data.get('authors', [])
        if authors_data is not None:
            instance.authors.clear()
            for author_name in authors_data:
                author, _ = Author.objects.get_or_create(name=author_name)
                instance.authors.add(author)

        isbn_data = validated_data.get('isbn', None)
        if isbn_data:
            isbn_instance, _ = ISBN.objects.get_or_create(isbn_number=isbn_data)
            instance.isbn = isbn_instance

        instance.save()
        return instance
class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['name']