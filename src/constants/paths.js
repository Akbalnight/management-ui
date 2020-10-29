import {AuthorizationCode, Login} from 'mobile-inspections-base-ui';
import Home from '../components/Home/Home';
import Debug from '../components/Debug/Debug';
import Users from '../components/Users/Users';

const pathPrefix = '/management';

export const paths = {
	PATH_PREFIX: {
		title: 'Management',
		path: `${pathPrefix}`,
	},
	LOGIN: {
		title: 'Login',
		path: `${pathPrefix}/login`,
		component: Login,
	},
	AUTHORIZATION_CODE: {
		title: 'Authorization code',
		path: `${pathPrefix}/authorization_code`,
		component: AuthorizationCode,
	},
	HOME: {
		title: 'Главная',
		path: `${pathPrefix}/home`,
		component: Home,
	},
	DEBUG_LIB: {
		title: 'Отладка библиотеки',
		path: `${pathPrefix}/debug-lib`,
		component: Debug,
	},
	USERS: {
		title: 'Пользователи',
		path: `${pathPrefix}/users`,
		component: Users,
	},
	USERS_EDIT: {
		title: 'Изменение пользователя',
		path: `${pathPrefix}/users/:id`,
		component: Debug,
	},
};
