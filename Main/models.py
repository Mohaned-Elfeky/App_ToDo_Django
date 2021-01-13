from django.db import models
from django.contrib.auth.models import User

# Create your models here. 
    
class CustomList(models.Model):
    User=models.ForeignKey(User, on_delete=models.CASCADE)
    name=models.CharField(max_length=50,null=True)
    
    
class Task(models.Model):
    User = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(max_length=3000)
    date = models.DateField(auto_now=False, auto_now_add=False)
    priority=models.CharField(max_length=50,null=True,blank=True)
    overdue=models.BooleanField(default=False)
    CustomList=models.ForeignKey(CustomList,null=True,default=None, on_delete=models.CASCADE)
    