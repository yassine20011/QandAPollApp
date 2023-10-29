from django.db import models
from django.contrib.auth.models import User

# Create your models here.



class Session(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    session_name = models.CharField(max_length=100)
    code = models.CharField(max_length=10, unique=True)
    
    def __str__(self):
        return self.session_name

class Question(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    question = models.CharField(max_length=100, blank=False, null=False)
    
    def __str__(self):
        return self.question
    

class Options(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    option = models.CharField(max_length=100, blank=False, null=False)

    def __str__(self):
        return self.option