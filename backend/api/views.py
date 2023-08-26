from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .models import Session, Question, Answer
from .serializers import SessionSerializer, QuestionSerializer, AnswerSerializer



class SessionViewSet(viewsets.ModelViewSet):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    
class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer