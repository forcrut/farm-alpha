from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseNotAllowed, JsonResponse, HttpResponseNotFound
from .forms import CreateUserForm, AuthUserForm, ChangeUserForm, ViewUserForm
from django.template.loader import render_to_string
from django.contrib.auth import login, logout


def viewHandler(request):
	if request.method != "GET":
		return HttpResponseNotAllowed(['GET'])
	if request.user.is_authenticated:
		form = ViewUserForm(instance=request.user)
	else:
		return redirect('login')

	if request.headers.get('GetContent') == 'html':
		return JsonResponse({
			'form': render_to_string(
				'dynamic/profile_view.html', 
				{
					'form': form,
				}, 
				request=request
			),
			'title': 'Профиль'
		})
	else:
		return HttpResponseNotFound('Ресурс не может быть получен ввиду отсутсвия специального заголовка')

def loginHandler(request):
	if request.method == "POST":
		form = AuthUserForm(request.POST)
		if form.is_valid():
			user = form.get_user()
			login(request, user)
			return JsonResponse({
				'redirect': True,
				'url': reverse('home'),
			})
	elif request.method == "GET":
		form = AuthUserForm()
	else:
		return HttpResponseNotAllowed(['GET', 'POST'])

	if request.headers.get('GetContent') == 'html':
		return JsonResponse({
			'form': render_to_string(
				'dynamic/profile_login.html', 
				{
					'form': form,
				}, 
				request=request
			),
			'title': 'Ауентификация'
		})
	else:
		return HttpResponseNotFound('Ресурс не может быть получен ввиду отсутсвия специального заголовка')

def registerHandler(request):
	if request.method == "POST":
		form = CreateUserForm(request.POST)
		if form.is_valid():
			user = form.get_user()
			login(request, user)
			return JsonResponse({
				'redirect': True,
				'url': reverse('home'),
			})
	elif request.method == "GET":
		form = CreateUserForm()
	else:
		return HttpResponseNotAllowed(['GET', 'POST'])
	
	if request.headers.get('GetContent') == 'html':
		return JsonResponse({
			'form': render_to_string(
				'dynamic/profile_register.html', 
				{
					'form': form,
				}, 
				request=request
			),
			'title': 'Регистрация'
		})
	else:
		return HttpResponseNotFound('Ресурс не может быть получен ввиду отсутсвия специального заголовка')

@login_required
def editHandler(request):
	if request.method == "POST":
		form = ChangeUserForm(request.POST)
		if form.is_valid():
			form.save()
			return JsonResponse({
				'redirect': True,
				'url': request.POST['url']
			})
	elif request.method == "GET":
		form = ChangeUserForm(instance=request.user)
	else:
		return HttpResponseNotAllowed(['GET', 'POST'])
	
	if request.headers.get('GetContent') == 'html':
		return JsonResponse({
			'form': render_to_string(
				'dynamic/profile_edit.html', 
				{
					'form': form,
				}, 
				request=request
			),
			'title': 'Редактирование'
		})
	else:
		return HttpResponseNotFound('Ресурс не может быть получен ввиду отсутсвия специального заголовка')

# TODO нужен ли здесь заголовок GetContent и вообще может вернуться к заголовку-ключу
@login_required
def logoutHandler(request):
	if request.method != "POST":
		return HttpResponseNotAllowed(['POST'])

	logout(request)
	return JsonResponse({
		'redirect': True,
		'url': reverse('home')
	})
