'''
from django.db import models

class Author(models.Model):
    name = models.CharField(max_length=255)




class Book(models.Model):
    title = models.CharField(max_length=100)
    publicationYear = models.IntegerField()
    genre = models.CharField(max_length=50)
    availability = models.BooleanField(default=True)
    stock = models.IntegerField()
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    authors = models.ManyToManyField(Author)

    def __str__(self):
        return self.title




class BookAuthor(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)

    class Meta:
        unique_together = (('book', 'author'),)  # Zapewnia unikalność pary książka-autor

    def __str__(self):
        return f"{self.book.title} by {self.author.name}"
'''

from django.db import models
from django.contrib.auth.models import User

class Author(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class ISBN(models.Model):
    isbn_number = models.CharField(max_length=17, unique=True)

    # This __str__ method will be fine after Book model definition
    def __str__(self):
        # We'll add a try-except block to handle the case when the ISBN has no related book yet
        try:
            return f"{self.isbn_number} - {self.book.title}"
        except Book.DoesNotExist:
            return f"{self.isbn_number} - No linked book"

class Book(models.Model):
    title = models.CharField(max_length=255)
    publicationYear = models.IntegerField()
    genre = models.CharField(max_length=100)
    stock = models.IntegerField()
    image = models.ImageField(upload_to='images/')
    authors = models.ManyToManyField(Author)
    isbn = models.OneToOneField(ISBN, on_delete=models.CASCADE, null=True, related_name='book')

    def __str__(self):
        return self.title
class BookCopy(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    status = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.book.title} - Copy'

class BorrowedBook(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    copy = models.ForeignKey(BookCopy, on_delete=models.CASCADE)
    borrowed_date = models.DateField()
    expected_return_date = models.DateField()
    actual_return_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f'{self.user.username} borrowed {self.copy.book.title}'

class ReservedBook(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    copy = models.ForeignKey(BookCopy, on_delete=models.CASCADE)
    reservation = models.DateField()
    reservation_end = models.BooleanField()

    def __str__(self):
        return f'{self.user.username} reserved {self.copy.book.title}'

class ArchiveLoan(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    copy = models.ForeignKey(BookCopy, on_delete=models.CASCADE)
    borrowed_date = models.DateField()
    expected_return_date = models.DateField()
    actual_return_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f'{self.user.username} archived loan of {self.copy.book.title}'
