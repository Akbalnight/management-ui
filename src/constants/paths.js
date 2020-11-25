import {AuthorizationCode, Login} from 'mobile-inspections-base-ui';
import Home from '../components/Home/Home';
import Debug from '../components/Debug/Debug';
import Users from '../components/Users/Users';
import UserEdit from '../components/Users/UserEdit';
import Roles from '../components/Roles/Roles';
import RoleEdit from '../components/Roles/RoleEdit';
import Permissions from '../components/Permissions/Permissions';

const pathPrefix = process && process.env && process.env.PUBLIC_URL;

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
		roles: ['ROLE_ADMIN'],
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
		roles: ['ROLE_ADMIN'],
	},
	USERS_EDIT: {
		title: 'Изменение пользователя',
		path: `${pathPrefix}/users/:id`,
		component: UserEdit,
	},
	ROLES: {
		title: 'Роли',
		path: `${pathPrefix}/roles`,
		component: Roles,
		roles: ['ROLE_ADMIN'],
	},
	ROLES_EDIT: {
		title: 'Изменение роли',
		path: `${pathPrefix}/roles/:id`,
		component: RoleEdit,
	},
	PERMISSIONS: {
		title: 'Права доступа',
		path: `${pathPrefix}/permissions`,
		component: Permissions,
		roles: ['ROLE_ADMIN'],
	},
};
