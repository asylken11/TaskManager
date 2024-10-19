from django.contrib import admin
from django.urls import path, include
from .views import (
    PostCRUD, comment_create, comment_list, comment_update, comment_delete, comment_detail,     
    who_am_i, list_posts_by_category, ToggleRankView, Top10RatedPostsView, CategoryListAPIView
)

app_name = 'postapi'
urlpatterns = [
    path('posts/', PostCRUD.as_view(), name='post-list-create'),
    path('posts/<int:pk>/', PostCRUD.as_view(), name='post-detail'),
    path('posts/category/<int:category_id>/', list_posts_by_category, name='list_posts_by_category'),
    path('posts/top10/', Top10RatedPostsView.as_view(), name='post-detail'),
    
    path('comments/', comment_create, name='comment-create'),  # CREATE
    path('comments/list/', comment_list, name='comment-list'),  # READ ALL
    path('comments/<int:pk>/', comment_detail, name='comment-detail'),  # READ SINGLE
    path('comments/<int:pk>/update/', comment_update, name='comment-update'),  # UPDATE
    path('comments/<int:pk>/delete/', comment_delete, name='comment-delete'),  # DELETE
    
    path('check/', who_am_i, name='who_am_i'),
    
    path('posts/<int:post_id>/toggle_rank/', ToggleRankView.as_view(), name='toggle_rank'),
    
    path('categories/', CategoryListAPIView.as_view(), name='category-list'),
]
