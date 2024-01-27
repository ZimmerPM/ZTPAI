from django.urls import path
from . import views
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
     path('home/', views.HomeView.as_view(), name ='home'),
     path('api_login/', LoginView.as_view(), name='login_api'),
     path('login/', login_page, name='login_page'),

     # Simple JWT
     path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
     path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

     path('logout/', views.LogoutView.as_view(), name ='logout'),
     path('register/', RegisterView.as_view(), name='register'),
     path('get_user_info/', views.get_user_info, name='get_user_info'),
]