'use strict';

const requestToken = '1234';
// TODO продумать хранение дочерних элементов operations
const urlNames = {
	auth: {name: 'auth', url: '/auth/'},
	home: {name: 'home', url: '/'},
	about: {name: 'about', url: '/about'},
	operations: {name: 'operations', url: '/operations/'},
	contacts: {name: 'contacts', url: '/contacts'},
	buy: {name: 'buy', url: '/buy'}
}
// const urlPATH = {
// 	auth: '/auth/',
// 	home: '/',
// 	about: '/about',
// 	operations: '/operations/',
// 	contacts: '/contacts',
// };
const blockRequestError = `
	<div class="container w-50 text-center bg-light text-danger border border-5 border-danger rounded-5 m-auto">
		<div class="text">
			Проблема с получением данных,<br>повторите попытку позже.
		</div>
	</div>
`;
const titleRequestError = 'Ошибка';
const logo1Dir = '../static/images/logo1.jpg';
const logo2Dir = '../static/images/logo2.jpg';
const showNav = "translateY(0%)";
const closeNav = "translateY(-100%)";
const headerIndent = 50;