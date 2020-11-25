import {
	HomeOutlined,
	UserOutlined,
	TeamOutlined,
	SafetyOutlined,
} from '@ant-design/icons';

import {paths} from './paths';

export const menu = [
	{
		...paths.HOME,
		icon: HomeOutlined,
	},
	{
		...paths.USERS,
		icon: UserOutlined,
	},
	{
		...paths.ROLES,
		icon: TeamOutlined,
	},
	{
		...paths.PERMISSIONS,
		icon: SafetyOutlined,
	},
];
