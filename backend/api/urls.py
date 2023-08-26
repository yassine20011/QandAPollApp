from django.urls import path, include
from . import views
from rest_framework import routers
from .views import SessionViewSet, QuestionViewSet, AnswerViewSet

router = routers.DefaultRouter()
router.register(r'sessions', SessionViewSet)
router.register(r'questions', QuestionViewSet)
router.register(r'answers', AnswerViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
