from rest_framework.renderers import JSONRenderer

class PostJSONRenderer(JSONRenderer):
    """
    Custom renderer for Post-related responses.
    This custom renderer can be used to modify the JSON output for Post-related APIs.
    """
    charset = 'utf-8'  # You can set the character set if required
    
    def render(self, data, accepted_media_type=None, renderer_context=None):
        """
        Override the render method to modify the JSON output.
        - data: The data to be rendered
        - accepted_media_type: The media type accepted by the client
        - renderer_context: Additional context passed by the framework
        """
        # You can modify the data here before rendering it to JSON
        # For example, wrap it in a top-level key, add metadata, etc.
        
        response_data = {
            'status': 'success',
            'data': data  # You can manipulate this as needed
        }
        
        return super().render(response_data, accepted_media_type, renderer_context)