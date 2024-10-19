from .serializers import *
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Post
from rest_framework.views import APIView 
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.exceptions import NotFound, PermissionDenied
from .models import Post, Comment, PostRank
from .serializers import PostSerializer
from .renderers import PostJSONRenderer
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from .permissions import IsCommentOwner
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist

class PostCRUD(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    # renderer_classes = (PostJSONRenderer,)
    
    def get(self, request, pk=None):
        if pk:
            # Retrieve a single post
            try:
                post = Post.objects.get(pk=pk)
                serializer = PostSerializer(post)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Post.DoesNotExist:
                raise NotFound("Post not found")
        else:
            # List all posts
            posts = Post.objects.all()
            serializer = PostSerializer(posts, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        # Create a new post
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            post = Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            raise NotFound("Post not found")

        # print(post.user_id, request.user)
        if post.user_id != request.user:
            raise PermissionDenied("You are not authorized to update this post")

        serializer = PostSerializer(post, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        print("Delete method called")
        try:
            post = Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            raise NotFound("Post not found")

        if post.user_id != request.user:
            raise PermissionDenied("You are not authorized to delete this post")

        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def list_posts_by_category(request, category_id):
    # Fetch posts based on the given category ID
    posts = Post.objects.filter(category_id=category_id)

    # Serialize the posts to return them as JSON
    serializer = PostSerializer(posts, many=True)
    
    # Return the serialized posts
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def comment_create(request):
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# READ all comments
@api_view(['GET'])
def comment_list(request):
    comments = Comment.objects.all()
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)


# READ a single comment by its ID
@api_view(['GET'])
def comment_detail(request, pk):
    comment = get_object_or_404(Comment, pk=pk)
    serializer = CommentSerializer(comment)
    return Response(serializer.data)


# UPDATE a comment by its ID
@api_view(['PUT', 'PATCH'])
def comment_update(request, pk):
    if not request.user.is_authenticated:
        return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

    comment = get_object_or_404(Comment, pk=pk)
    if comment.user_id != request.user:
        return Response({"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)

    serializer = CommentSerializer(comment, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# DELETE a comment by its ID
@api_view(['DELETE'])
def comment_delete(request, pk):
    if not request.user.is_authenticated:
        return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

    comment = get_object_or_404(Comment, pk=pk)
    if comment.user_id != request.user:
        return Response({"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)
    
    comment = get_object_or_404(Comment, pk=pk)
    comment.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def who_am_i(request):
    if request.user.is_authenticated:
        return Response({"username": request.user.username})
    return Response({"error": "User not authenticated"}, status=401)



class ToggleRankView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):
        try:
            post = Post.objects.get(id=post_id)
        except ObjectDoesNotExist:
            return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)

        category = post.category_id  # Get the category associated with the post

        try:
            # Try to find an existing rank by the current user for the post
            post_rank = PostRank.objects.get(post=post, user=request.user)
            # If found, delete it to 'unlike' and decrease the rank
            post_rank.delete()
            post.rating -= 1
            category.rank -= 1
        except ObjectDoesNotExist:
            # If not found, create it to 'like' and increase the rank
            PostRank.objects.create(post=post, user=request.user)
            post.rating += 1
            category.rank += 1

        post.save()  # Save the updated post
        category.save()  # Save the updated category

        return Response({"message": "Rank toggled successfully"}, status=status.HTTP_200_OK)


class Top10RatedPostsView(APIView):
    def get(self, request):
        # Get the top 10 posts sorted by rating in descending order
        top_rated_posts = Post.objects.all().order_by('-rating')[:10]
        
        # Serialize the data
        serializer = PostSerializer(top_rated_posts, many=True)
        
        # Return the serialized data with a 200 OK status
        return Response(serializer.data, status=status.HTTP_200_OK)
    


class CategoryListAPIView(APIView):
    def get(self, request):
        # Fetch all categories from the database
        categories = Category.objects.all()

        # Serialize the categories
        serializer = CategorySerializer(categories, many=True)

        # Return a JSON response with the serialized data
        return Response(serializer.data, status=status.HTTP_200_OK)