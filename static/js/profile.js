'use strict';

$(document).ready(function(){
	// Функция обработки успешного ajax-запроса
	function showProfile(response) {
		if (response.redirect) {
			window.location.href = response.url;
		}
		else {
			$('#profile-form').html(response.form);
			$('#profile-title').text(response.title);
		}
	};
	// Функция обработки проваленного ajax-запроса
	function showErrorProfile(xhr, status, error) {
		$('#profile-form').html(blockRequestError);
		$('#profile-title').text(titleRequestError);
	};
	// Кнопка профиля
	$("#profile-link").click(function(event) {
		event.preventDefault();
		$.ajax({
			url: viewURL,
			type: 'GET',
			headers: {
				'X-Server-Token': requestToken
			},
			success: function (response) {
				showProfile(response);
				$('#profile').modal('show');
			},
			error: showErrorProfile
		});
	});
	if (localStorage.getItem('showModal') === 'true') {
		$("#profile-link").click();
		localStorage.removeItem('showModal');
	};
	// Отправка формы входа
	$(document).on('submit', '#profile-login-form', function(event) {
		event.preventDefault();
		$.ajax({
			url: loginURL,
			type: 'POST',
			data: $(this).serialize(),
			headers: {
				'X-Server-Token': requestToken
			},
			success: showProfile,
			error: showErrorProfile
		});
	});
	// Переход от входа в регистрацию
	$(document).on('click', '#login2register-button', function(event) {
		event.preventDefault();
		$.ajax({
			url: viewURL,
			type: 'GET',
			headers: {
				'X-Server-Token': requestToken
			},
			success: showProfile,
			error: showErrorProfile
		});
	});
	// Отправка формы регистрации
	$(document).on('submit', '#profile-register-form', function(event) {
		event.preventDefault();
		$.ajax({
			url: registerURL,
			type: 'POST',
			data: $(this).serialize(),
			headers: {
				'X-Server-Token': requestToken
			},
			success: showProfile,
			error: showErrorProfile
		});
	});
	// Переход от просмотра к редактированию
	$(document).on('click', '#profile-edit-button', function(event) {
		event.preventDefault();
		$.ajax({
			url: viewURL,
			type: 'GET',
			headers: {
				'X-Server-Token': requestToken
			},
			success: showProfile,
			error: showErrorProfile
		});
	});
	// Отправка формы редактирования
	$(document).on('submit', '#profile-edit-form', function(event) {
		event.preventDefault();
		$.ajax({
			url: editURL,
			type: 'POST',
			data: $(this).serialize() + `&url=${window.location.href}`,
			headers: {
				'X-Server-Token': requestToken
			},
			success: function (response) {
				localStorage.setItem('showModal', 'true');
				showProfile(response);
			},
			error: showErrorProfile
		});
	});
	// Отправка формы выхода из аккаунта
	$(document).on('submit', '#profile-logout-form', function(event) {
		event.preventDefault();
		$.ajax({
			url: logoutURL,
			type: 'POST',
			data: $(this).serialize(),
			headers: {
				'X-Server-Token': requestToken
			},
			success: showProfile,
			error: showErrorProfile
		});
	});
	// Другое
	// Необходимость согласия с условиями для регистрации
	$(document).on('change', '#terms-to-agree input', function() {
		if ($('#terms-to-agree input').length === $('#terms-to-agree input:checked').length) {
			$('#profile-register-button').removeAttr('disabled');
		}
		else {
			$('#profile-register-button').attr('disabled', '');
		};
	});
});