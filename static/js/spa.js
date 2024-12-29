'use strict';

function baseData() {
	return {
		currentPage: 'home',
		isHeadline: false,
		title: 'Мобильная ферма',
		headlineTitle: '',
		init() {
			this.loadPage(this.currentPage);
		},
		loadPage(page) {
			this.currentPage = page;
			$.ajax({
				url: urlNames[page].url,
				method: 'GET',
				headers: {
					'GetContent': 'variables',
				},
				success: (response) => {
					this.isHeadline = page !== 'operations';
					this.title = response.title;
					this.headlineTitle = response.headline_title;
					window.history.pushState({}, '', urlNames[page].url);
					initDocument();
				},
				error: (xhr, status, error) => {
					this.isHeadline = false;
					this.title = 'Ошибка загрузки';
					// TODO проверить и продумать else отображение
					this.headlineTitle = undefined;
				}
			});
		},
		isProfileOpen: false,
		profileTitle: '',
		profileForm: '',
		// TODO Нужно избавиться от встроенных форм и использовать эту функцию перехода к другим формам
		loadProfile(action='view') {
			$.ajax({
				url: `${urlNames.auth.url}${action}`,
				method: "GET",
				headers: {
					'GetContent': 'html',
				},
				success: (response) => {
					this.profileTitle = response.title;
					this.profileForm = response.form;
				},
				error: (xhr, status, error) => {
					this.profileTitle = "Ошибка загрузки";
					this.profileForm = blockRequestError;
				}
			});
		}
	}
};
function headerData() {
	return {
		scrollPosition: 0,
		isScrollingUp: true,
		ticking: false,
		init() {
		},
		updateMenu() {
			if (window.scrollY !== this.scrollPosition) {
				if (!this.ticking) {
					window.requestAnimationFrame(() => {
						if (window.scrollY < this.scrollPosition) {
							// Up
							if (!this.isScrollingUp) {
								$('header').css('transform', showNav);
								this.isScrollingUp = true;
							}
						} else {
							// Down
							if (this.isScrollingUp && window.scrollY > headerIndent) {
								$('header').css('transform', closeNav);
								this.isScrollingUp = false;
							}
						}
						this.scrollPosition = window.scrollY;
						this.ticking = false;
					});
					this.ticking = true;
				};
			};
		}
	}
};
function quickCalculatorData() {
	return {
		selectedValue: '',
		init() {
			$('#animal-group').selectpicker();
		}
	}
};
function loginData() {
	return {
		actionUrl: `${urlNames.auth.url}login`,
	}
};
function viewData() {
	return {
		actionUrl: `${urlNames.auth.url}edit`,
	}
};
function registerData() {
	return {
		actionUrl: `${urlNames.auth.url}register`,
		isChecked: false,
		checkAll() {
			const checkBoxes = $("#terms-to-agree input[type='checkbox']");
			this.isChecked = (checkBoxes.length === checkBoxes.filter(":checked").length);
		},
	}
};
function editData() {
	return {
		actionUrl: `${urlNames.auth.url}edit`,
	}
};
function logoutData() {
	return {
		actionUrl: `${urlNames.auth.url}logout`,
	}
};
function footerData() {
	return {
		goHome() {
			if(window.location.pathname === '/') {
				$(document).scrollTop(0);
				return true;
			}
		}
	}
};