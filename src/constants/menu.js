import {HomeOutlined, BugOutlined, UserOutlined} from '@ant-design/icons';

import {paths} from './paths';

export const menu = [
	{
		...paths.HOME,
		icon: HomeOutlined,
	},
	{
		...paths.DEBUG_LIB,
		icon: BugOutlined,
	},
	{
		...paths.USERS,
		icon: UserOutlined,
	},
];
