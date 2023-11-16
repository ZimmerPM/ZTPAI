from django.db import models

# Create your models here.

class Book(models.Model):
    title = models.CharField(max_length=100)
    publication_year = models.IntegerField()
    genre = models.CharField(max_length=50)
    availability = models.BooleanField(default=True)
    stock = models.IntegerField()
    image = models.ImageField(upload_to='images/', blank=True, null=True)

    def __str__(self):
        return self.title
