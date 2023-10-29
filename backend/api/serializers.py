from .models import Session, Question, Options
from rest_framework import serializers
    

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):

    question = serializers.CharField(max_length=100, required=True)

    class Meta:
        model = Question
        fields = '__all__'


class OptionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Options
        fields = '__all__'
