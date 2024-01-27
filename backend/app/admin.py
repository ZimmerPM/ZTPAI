from django.contrib import admin
from .models import Author, Book, BookCopy, BorrowedBook, ReservedBook, ArchiveLoan, ISBN

# Rejestracja modeli w panelu administracyjnym
admin.site.register(Author)
admin.site.register(Book)
admin.site.register(BookCopy)
admin.site.register(BorrowedBook)
admin.site.register(ReservedBook)
admin.site.register(ArchiveLoan)
admin.site.register(ISBN)

