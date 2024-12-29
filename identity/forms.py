from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password


User = get_user_model()

class CreateUserForm(UserCreationForm):
	email = forms.EmailField(
		required=True, 
		label="Почта", 
		help_text="Введите вашу почту."
	)
	agree_to_terms = forms.BooleanField(
		required=True,
		label="Согласен с условиями",
		help_text="Требуется согласие."
	)
	agree_to_smth = forms.BooleanField(
		required=True,
		label="Согласен с чем-то",
		help_text="Требуется согласие."
	)

	class Meta:
		model = User
		fields = ('username', 'last_name', 'first_name', 'email', 'password1', 'password2')
		labels = {
			'username': 'Имя пользователя',
			'last_name': 'Фамилия',
			'first_name': 'Имя',
			'password1': 'Пароль',
			'password2': 'Повторите пароль',
		}

	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		valid_class = 'is-invalid' if self.non_field_errors() else 'border-primary'

		for field in self.fields:
			self.fields[field].widget.attrs['class'] = 'is-invalid' if self.errors.get(field, []) else valid_class

	def clean_password1(self):
		password1 = self.cleaned_data.get('password1')
		if password1:
			validate_password(password=password1)
		else:
			raise ValidationError("Это поле обязательно для заполнения.")
		return password1

	def clean(self):
		cleaned_data = super().clean()
		print(cleaned_data.get('agree_to_terms'))
		return cleaned_data


class AuthUserForm(forms.Form):
	username_or_email = forms.CharField(
		max_length=150, 
		required=True, 
		label="Имя пользователя или почта",
		help_text="Введите почту или имя пользователя, используемые при регистрации."
	)
	password = forms.CharField(
		widget=forms.PasswordInput, 
		required=True, 
		label="Пароль",
		help_text="Введите пароль."
	)

	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		valid_class = 'is-invalid' if self.non_field_errors() else 'border-primary'

		for field in self.fields:
			self.fields[field].widget.attrs['class'] = 'is-invalid' if self.errors.get(field, []) else valid_class

	def clean_username_or_email(self):
		username_or_email = self.cleaned_data.get('username_or_email')
		if not username_or_email:
			raise ValidationError("Это поле обязательно для заполнения.")
		if not User.objects.filter(username=username_or_email).exists() and not User.objects.filter(email=username_or_email).exists():
			raise ValidationError("Пользователь с таким именем или почтой не найден.")
		return username_or_email

	def clean_password(self):
		password = self.cleaned_data.get('password')		
		if not password:
			raise ValidationError("Это поле обязательно для заполнения.")
		return password

	def clean(self):
		cleaned_data = super().clean()
		username_or_email = cleaned_data.get("username_or_email")
		password = cleaned_data.get("password")
		# доп. проверка данных
		if username_or_email and password:
			user = authenticate(username=username_or_email, password=password) or authenticate(username=username_or_email, password=password)
			if user is None:
				self.add_error(None, ValidationError("Проверьте введенные данные."))
		return cleaned_data

	def get_user(self):
		return authenticate(username=self.cleaned_data['username_or_email'], password=self.cleaned_data['password']) or \
				authenticate(username=self.cleaned_data['username_or_email'], password=self.cleaned_data['password'])


class ChangeUserForm(UserChangeForm):
	class Meta:
		model = User
		fields = ('username', 'last_name', 'first_name', 'email')
		labels = {
			'username': 'Имя пользователя',
			'last_name': 'Фамилия',
			'first_name': 'Имя',
			'email': 'Почта',
		}

	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		valid_class = 'is-invalid' if self.non_field_errors() else 'border-primary'

		for field in self.fields:
			self.fields[field].widget.attrs['class'] = 'is-invalid' if self.errors.get(field, []) else valid_class


class ViewUserForm(forms.ModelForm):
	class Meta:
		model = User
		fields = ('username', 'last_name', 'first_name', 'email')
		labels = {
			'username': 'Имя пользователя',
			'last_name': 'Фамилия',
			'first_name': 'Имя',
			'email': 'Почта',
		}

	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		valid_class = 'is-invalid' if self.non_field_errors() else 'border-primary'

		for field in self.fields:
			self.fields[field].widget.attrs['class'] = 'is-invalid' if self.errors.get(field, []) else valid_class
