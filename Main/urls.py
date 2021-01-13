from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('',views.index, name='index'),
    path('add/',views.add,name='add'),
    path('edit/',views.edit,name='edit'),
    path('get_tasks/',views.getTasks,name='get_tasks'),
    path('delete/',views.deleteTask,name='delete'),
    path('delete_list/',views.deleteList,name='delete_list'),
    path('add_list/',views.addList,name='add_list'),
    path('task_to_list/',views.taskToList,name='task_to_list'),
    path('login/',views.login_user,name='login'),
    path('signup/',views.signup,name='signup'),
    path('logout/',views.signout,name='logout')
]
