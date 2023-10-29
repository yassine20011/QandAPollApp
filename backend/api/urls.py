from django.urls import path, include
from . import views
from rest_framework import routers



urlpatterns = [
    path('sessions/', views.SessionAPIView.as_view()),
    path('questions/', views.QuestionAPIView.as_view()),
    path('options/', views.OptionAPIView.as_view()),
]