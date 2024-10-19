from rest_framework import serializers
from .models import Post, Comment, Category
from authentication.models import User

class PostSerializer(serializers.Serializer):
    # Manually define the fields from the Post model
    id = serializers.IntegerField(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    category_id = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    date = serializers.DateTimeField(read_only=True)
    body = serializers.CharField(max_length=3300, default="Empty")
    title = serializers.CharField(max_length=255)
    image_path = serializers.ImageField(required=False)
    rating = serializers.FloatField(default=0)

    def create(self, validated_data):
        # Method to create a new Post object
        return Post.objects.create(**validated_data)

    def update(self, instance, validated_data):
        # Method to update an existing Post object
        instance.user_id = validated_data.get('user_id', instance.user_id)
        instance.category_id = validated_data.get('category_id', instance.category_id)
        instance.body = validated_data.get('body', instance.body)
        instance.title = validated_data.get('title', instance.title)
        instance.image_path = validated_data.get('image_path', instance.image_path)
        instance.rating = validated_data.get('rating', instance.rating)
        instance.save()
        return instance
    
    def validate_title(self, value):
        # Add a title validation, ensuring it is not empty
        if not value.strip():
            raise serializers.ValidationError("Title cannot be empty")
        return value

class CommentSerializer(serializers.Serializer):
    # Define the fields from the Comment model
    id = serializers.IntegerField(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    post_id = serializers.PrimaryKeyRelatedField(queryset=Post.objects.all())
    date = serializers.DateTimeField(read_only=True)
    body = serializers.CharField()

    def create(self, validated_data):
        # Create a new Comment instance with the validated data
        return Comment.objects.create(**validated_data)

    def update(self, instance, validated_data):
        # Update an existing Comment instance with the validated data
        instance.user_id = validated_data.get('user_id', instance.user_id)
        instance.post_id = validated_data.get('post_id', instance.post_id)
        instance.body = validated_data.get('body', instance.body)
        instance.save()
        return instance

    def validate_body(self, value):
        # Ensure the comment body is not empty
        if not value.strip():
            raise serializers.ValidationError("Comment body cannot be empty")
        return value


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'rank']