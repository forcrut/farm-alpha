'use strict';

function updateLogo() {
	if ($(window).width() <= 1200) {
		$("#logo").attr('src', logo2Dir).removeClass('logo-1').addClass('logo-2');
	}
	else {
		$("#logo").attr('src', logo1Dir).removeClass('logo-2').addClass('logo-1');
	};
};
function initMenu() {
	$('.navbar-nav .nav-item .menu-item').each(function() {
		$(this).find('span.icon-fill').addClass('d-none');
		$(this).find('span.icon').removeClass('d-none');
	});
	$('.navbar-nav .nav-item a').each(function() {
		if (this.href != window.location.href) {
			return;
		};
		let toFill = [];
		if ($(this).hasClass('sub-menu-item')) {
			toFill = [$(this).find('.menu-item'), $(this).closest('ul.sub-menu').closest('.menu-item')];
		}
		else {
			toFill = [$(this).find('.menu-item')];
		};
		toFill.forEach(function(tag) {
			tag.find('span.icon-fill').removeClass('d-none');
			tag.find('span.icon').addClass('d-none');
		});
		return false;
	});
	$('header').css('transform', showNav);
};
function initDocument() {
	updateLogo();
	// initMenu();
	$(document).scrollTop(0);
};
function resizeWindow() {
	updateLogo();
};