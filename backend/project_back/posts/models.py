from django.db import models
from authentication.models import User

class Category(models.Model):
    name = models.CharField(max_length=100)
    rank = models.IntegerField()

    def __str__(self):
        return self.name

class Post(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    body = models.TextField(max_length=3300, default="Empty")
    title = models.CharField(max_length=255)
    image_path = models.ImageField(upload_to='post_images/', blank=True, default="")
    rating = models.FloatField(default=0) 

    def __str__(self):
        return self.title

class Comment(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    post_id = models.ForeignKey(Post, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    body = models.TextField()

    def __str__(self):
        return f"Comment by {self.user_id} on {self.post_id.title}"

class PostRank(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('post', 'user')  # Ensure each user can rank a post only once


