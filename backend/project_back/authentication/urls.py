from django.urls import path

from .views import RegistrationAPIView, LoginAPIView, UserRetrieveUpdateAPIView, LogoutView

app_name = 'authentication'
urlpatterns = [
    path('user', UserRetrieveUpdateAPIView.as_view()),
    path('users/', RegistrationAPIView.as_view()),
    path('users/login/', LoginAPIView.as_view()),
    path("users/logout/", LogoutView.as_view(), name="logout"),
]