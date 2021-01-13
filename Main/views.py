from django.shortcuts import render,redirect
from django.http import HttpResponse,JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login ,logout
from Main.models import *
from datetime import *
import json
# Create your views here.


def index(request):
    
    
    if request.user.is_anonymous:
       return  redirect('/signup/')
    
    
    tday=date.today()
    week=[]
    
    for i in range(7):
        day=(tday+timedelta(days=i+1))
        week.append(day)
        
    
    tasks=Task.objects.filter(User=request.user)
    lists=CustomList.objects.filter(User=request.user)
    checkOverdue()

    context={
        "tasks":tasks,
        "week_start":week[0],
        "week_end":week[6],
        "today":date.today(),
        "lists":lists,
        "user":request.user
        
    }
 
    return render(request,'index.html',context)

def login_user(request):
    error_msg=""
    
    if not request.user.is_anonymous:
        return  redirect(index)
        
    if request.method=="POST":
        data=request.POST
        if User.objects.filter(email=data["email"]).exists():
            log_user=User.objects.get(email=data["email"])
            user=authenticate(username=log_user.username,password=data["password"])
            if  user is not None:
                login(request,user)
                return redirect(index)    
            else:
                error_msg="Email and password don't match"
                return render(request,'login.html',{"error":error_msg})
        
        else:
             error_msg="Emial doesn't exist"
             return render(request,'login.html',{"error":error_msg})
                
            
        
        
    else:
        return render(request,'login.html',{"error":error_msg})
        
    
    
    
    
    return render(request,"login.html")


def signup(request):
    error_msg=""
    
    if not request.user.is_anonymous:
       return  redirect(index)
    

    if request.method=="POST":
        
        data=request.POST
        
        if not User.objects.filter(username=data["user_name"]).exists():
            new_user=User(username=data["user_name"],email=data["email"])
            new_user.set_password(data["password"])
            new_user.save()
            shopping_list=CustomList(User=new_user,name="Shopping list")
            shopping_list.save()
            login(request,new_user)
            return redirect(index)
        else:
            error_msg="User name already exists try logging in"
            return render(request,'login.html',{"error":error_msg})
    
    else:
         return render(request,'login.html',{"error":error_msg})
        
        
    
    
    
   
    
def signout(request):
    logout(request)
    return redirect(signup)
    
        
def checkOverdue():
    Tasks=Task.objects.all()
    for task in Tasks:
        if task.date < date.today():
            task.overdue=True
            task.save()

def  getTasks(request):
     data=json.loads(request.body)
     tasks_date=data["date"]
     list_id=data["list"]
     
     
     if list_id=="None":
         list_id=None
    
     if tasks_date == "all":
         tasks=list(Task.objects.filter(User=request.user,CustomList=list_id).values())
         return JsonResponse(tasks,safe=False)
         
     if tasks_date == "today":
         tasks=list(Task.objects.filter(User=request.user,CustomList=None,date=date.today()).values())
         return JsonResponse(tasks,safe=False)
         
     if tasks_date == "week":
         tasks=[]
         for i in range(7):
            day=(date.today()+timedelta(days=i+1))
            tasks += list(Task.objects.filter(User=request.user,CustomList=None,date=day).values())
         return JsonResponse(tasks,safe=False)
  

def add(request):
    data=json.loads(request.body)
    content=data['content']
    
    
    
    new_task=Task(content=content,User=request.user,date=data["date"])
    new_task.save()
    
    
    return JsonResponse("add page",safe=False)
    
def edit(request):
    
    data=json.loads(request.body)
    edit_task=Task.objects.get(id=data['task_id'])
    edit_task.content=data["new_value"]
    edit_task.save()
    
    return JsonResponse("edit page",safe=False)
    
def deleteTask(request):
    data=json.loads(request.body)
    delete_task=Task.objects.get(id=data['task_id'])
    delete_task.delete()
    return JsonResponse("delete page",safe=False)
    
def deleteList(request):
    data=json.loads(request.body)
    delete_list=CustomList.objects.get(User=request.user,id=data['list_id'])
    delete_list.delete()
    
    return JsonResponse("delete page",safe=False)
    
def addList(request):
    data=json.loads(request.body)
    list_name=data["list_name"]
    new_list=CustomList(User=request.user,name=list_name)
    new_list.save()
    return JsonResponse("add list page",safe=False)
    
def taskToList(request):
    
    data=json.loads(request.body)
    task_content=data["task_content"]
    list_id=data["list_id"]
    task_list=CustomList.objects.get(id=list_id)
    new_task=Task(User=request.user,CustomList=task_list,content=task_content,date=date.today())
    new_task.save()
    return JsonResponse("add task to list",safe=False)
    
