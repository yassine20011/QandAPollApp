from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    
    


class Session(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    code = models.CharField(max_length=10)
    
    

class Question(models.Model):
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    question = models.CharField(max_length=100)
    
    

class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.CharField(max_length=100)
