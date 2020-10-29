import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {Form} from 'rt-design';
import {useHistory} from 'react-router';
import {Checkbox} from 'antd';
import {
	apiGetConfigurationByName,
	apiGetFlatDataByConfigName,
} from '../../apis/dynamicdq.apis';

const Users = () => {
	let history = useHistory();

	const customColumnProps = [
		{
			name: 'enabled',
			cellRenderer: ({cellData}) => (
				<Checkbox checked={cellData} disabled />
			),
		},
		{
			name: 'ldap',
			cellRenderer: ({cellData}) => (
				<Checkbox checked={cellData} disabled />
			),
		},
	];

	const formConfig = {
		noPadding: true,
		body: [
			{
				componentType: 'Layout',
				children: [
					{
						componentType: 'Item',
						child: {
							componentType: 'ServerTable',
							rowKey: 'userId',
							customColumnProps: customColumnProps,
							// Подключение таблицы к react-router
							// Т.к. мы используем actionType: 'page' для кнопки создани и редактирвоания тех. карты
							// Нам требуется дать таблице инструмет для перехода по ссылкам
							history,

							// Получение иерархичной таблицы по имени конфигурации
							requestLoadRows: apiGetFlatDataByConfigName(
								'users'
							),

							// Получение конфигурации по имени
							requestLoadConfig: apiGetConfigurationByName(
								'users'
							),

							// В примере #2 будет описан вот этот объект
							commandPanelProps: {
								systemBtnProps: {
									add: {actionType: 'page'},
									edit: {actionType: ['page', 'modal']},
								},
							},
						},
					},
				],
			},
		],
	};

	return (
		<BasePage>
			<Form {...formConfig} />
		</BasePage>
	);
};

Users.propTypes = {};

export default Users;
