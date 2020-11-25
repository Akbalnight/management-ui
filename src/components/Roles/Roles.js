import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {Form} from 'rt-design';
import {useHistory} from 'react-router';
import {
	apiGetConfigurationByName,
	apiGetFlatDataByConfigName,
} from '../../apis/dynamicdq.apis';

const Roles = () => {
	let history = useHistory();

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
							rowKey: 'name',
							// customColumnProps: customColumnProps,
							// Подключение таблицы к react-router
							// Т.к. мы используем actionType: 'page' для кнопки создани и редактирвоания тех. карты
							// Нам требуется дать таблице инструмет для перехода по ссылкам
							history,

							// Получение иерархичной таблицы по имени конфигурации
							requestLoadRows: apiGetFlatDataByConfigName(
								'roles'
							),

							// Получение конфигурации по имени
							requestLoadConfig: apiGetConfigurationByName(
								'roles'
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

Roles.propTypes = {};

export default Roles;
