from rest_framework import permissions

class IsCommentOwner(permissions.BasePermission):
    """
    Permission to allow only the owner of a comment to update or delete it.
    """

    def has_object_permission(self, request, view, obj):
        # Allow read-only access to all users for GET, HEAD, or OPTIONS requests
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Check if the current user is the owner of the comment
        print(obj.user_id, request.user)
        return obj.user_id == request.user