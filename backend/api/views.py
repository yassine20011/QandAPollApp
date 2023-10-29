from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .models import Session, Question, Options
from .serializers import SessionSerializer, QuestionSerializer, OptionsSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from django.contrib.auth.models import User


class SessionAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        # Get the current authenticated user
        user = request.user

        # Get all sessions for the current user
        sessions = Session.objects.filter(user=user)

        # Serialize all sessions
        serializer = SessionSerializer(sessions, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        code = request.data.get('code')
        user = request.user
        session_name = request.data.get('session_name')

        # Create a new session with the provided code and user
        try:
            session = Session.objects.create(
                code=code, user=user, session_name=session_name)
            serializer = SessionSerializer(session)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        code = request.data.get('code')
        user = request.user

        # Get the session to delete
        try:
            session = Session.objects.get(code=code, user=user)
            session.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class QuestionAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = request.user
        session = request.GET.get('session')
        try:
            session = Session.objects.get(code=session, user=user)
            questions = Question.objects.filter(user=user, session=session)
            serializer = QuestionSerializer(questions, many=True)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, format=None):
        user = request.user
        session_code = request.data.get('session')
        session_instance = Session.objects.get(code=session_code, user=user)
        questions = request.data.get('data')
        try:
            for question in questions:
                try:
                    serializer = QuestionSerializer(data={'question': question.get('value'), 'user': user.id, 'session': session_instance.id})
                    serializer.is_valid(raise_exception=True) 
                    question_obj = Question.objects.get(
                        id=question.get('id'), user=user, session=session_instance)
                    question_obj.question = question.get('value')
                    question_obj.save()
                except Question.DoesNotExist:
                    question_obj = Question.objects.create(
                        user=user, session=session_instance, question=question.get('value'))

            questions = Question.objects.filter(
                user=user, session=session_instance)
            serializer = QuestionSerializer(questions, many=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e.args[0]["question"][0])
            if e.args[0]["question"][0] == "This field may not be blank.":
                return Response({"error": "Question cannot be empty"}, status=status.HTTP_400_BAD_REQUEST)
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        user = request.user
        session = request.data.get('session')
        id = request.data.get('inputField')
        session = Session.objects.get(code=session, user=user)
        try:
            question = Question.objects.get(
                id=id, user=user, session=session)
            question.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class OptionAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):

        user = request.user
        session = request.GET.get('session')
        option_id = request.GET.get('option_id')

        try:
            session = Session.objects.get(code=session, user=user)
            option_id = Options.objects.get(
                id=option_id, user=user, session=session)
            serializer = OptionsSerializer(option_id)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.data, status=status.HTTP_200_OK)
