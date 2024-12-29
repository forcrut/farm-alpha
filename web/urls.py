from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
	path('', views.home, name='home'),
	path('about', views.about, name='about'),
	path('operations/', views.operations, name='operations'),
	path('contacts', views.contacts, name='contacts'),
]

# path('buy/', views.buy, name='buy'),
# path('profile/<str:action>', views.get_profile, name='get_profile'),
