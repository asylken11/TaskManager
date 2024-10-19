from django.contrib import admin
from .models import User, BlacklistedToken
from posts.models import *
admin.site.register(User)
# admin.site.register(BlacklistedToken)
# admin.site.register(Category)

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'rank')  # Display these fields in the list view
    search_fields = ('name',)  # Allows searching by category name
    list_filter = ('rank',)  # Optionally filter by rank
    
class BlacklistedTokenAdmin(admin.ModelAdmin):
    list_display = ('id', 'token')  # Adjust fields as needed
    
class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'user_id', 'category_id', 'date', 'rating')

class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'post_id', 'user_id', 'body', 'date')  # Use 'post_id' to show ID of the related post
    list_filter = ('post_id', 'user_id')  # Use 'post_id' for filtering

# Register the models with the custom admin classes
admin.site.register(Post, PostAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(BlacklistedToken, BlacklistedTokenAdmin)