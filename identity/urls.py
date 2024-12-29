from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
	path('register', views.registerHandler, name='register'),
	path('login', views.loginHandler, name='login'),
	path('view', views.viewHandler, name='view'),
	path('edit', views.editHandler, name='edit'),
	path('logout', views.logoutHandler, name='logout'),
]
