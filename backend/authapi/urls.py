from django.urls import path
from . import views
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('home', views.HomeView.as_view(), name='home'),
    path('logout', views.LogOutView.as_view(), name='logout'),
    path('token/', views.CustomTokenPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh')
]