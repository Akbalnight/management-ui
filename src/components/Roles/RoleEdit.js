import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {Form} from 'rt-design';
import {useHistory, useParams} from 'react-router';
import {paths} from '../../constants/paths';
import {
	apiSaveDataByConfigName,
	apiGetFlatDataByConfigName,
	apiGetConfigurationByName,
} from '../../apis/dynamicdq.apis';
import {notification} from 'antd';

const RoleEdit = () => {
	const pageParams = useParams();
	const history = useHistory();

	const loadData = (callBack) => {
		if (pageParams.id === 'new') {
			callBack({});
		} else {
			apiGetFlatDataByConfigName('roles')({
				data: {role: pageParams.id},
			})
				.then((response) => {
					// console.log("loadData => response ", response.data);
					let data = response.data[0];
					data.permissions = JSON.parse(response.data[0].permissions);
					// data.roles =  JSON.parse(response.data[0].roles); // response.data[0].roles.split(', ');

					console.log('loadData => data ', data);
					callBack(data);
				})
				.catch((error) => {
					if (error.response) {
						console.log(error.response.data);
						console.log(error.response.status);
						console.log(error.response.headers);
						notification.error({
							message:
								'Произошла ошибка при загрузки данных формы',
						});
					}
				});
		}
	};

	const loadPermissions = ({params, data}) => {
		const newData = {
			...data,
			role: pageParams.id === 'new' ? null : pageParams.id,
		};
		return apiGetFlatDataByConfigName('rolePermissions')({
			data: newData,
			params,
		});
	};

	const processBeforeSaveForm = (rawValues) => {
		let data = {...rawValues};
		data.jsonData = JSON.stringify(data.jsonData);
		// for(let role in data.roles) {
		//     role.userRoleId =
		// }
		// data.roles =  JSON.stringify(data.roles);
		return data;
	};

	const fields = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Описание',
				level: 5,
			},
		},
		{
			componentType: 'Row',
			gutter: [16, 16],
			children: [
				{
					componentType: 'Col',
					span: 12,
					children: [
						{
							componentType: 'Item',
							label: 'Имя роли',
							name: 'name',
							rules: [
								{
									message: 'Заполните наименование',
									required: true,
								},
							],
							child: {componentType: 'Input'},
						},
					],
				},
				{
					componentType: 'Col',
					span: 12,
					children: [
						{
							componentType: 'Item',
							label: 'Описание роли',
							name: 'description',
							rules: [
								{
									message: 'Заполните описание',
									required: true,
								},
							],
							child: {componentType: 'Input'},
						},
					],
				},
			],
		},
	];
	const roles = [
		{
			componentType: 'Item',
			child: {
				componentType: 'Title',
				label: 'Роли',
				level: 5,
			},
		},
		{
			componentType: 'Layout',
			children: [
				{
					componentType: 'Item',
					name: 'permissions',
					child: {
						componentType: 'LocalTable',
						rowKey: 'idPermission',
						selectable: true,
						history,

						// Получение иерархичной таблицы по имени конфигурации
						requestLoadRows: loadPermissions,

						// Получение конфигурации по имени
						requestLoadConfig: apiGetConfigurationByName(
							'rolePermissions'
						),

						// // В примере #2 будет описан вот этот объект
						// commandPanelProps: {
						//     systemBtnProps: {
						//         add: {actionType: 'modal'},
						//         addAsCopy: {actionType: 'modal'},
						//         edit: {actionType: ['page', 'modal']},
						//     },
						// },
					},
				},
			],
		},
	];

	const onFinish = (values) => {
		// console.log("onFinish", values);
		// history.push(paths.USERS.path)
	};

	const formConfig = {
		name: 'RoleEdit',
		// labelCol: {span: 8},
		// wrapperCol: {span: 16},
		layout: 'vertical',
		loadInitData: loadData,
		requestSaveForm: apiSaveDataByConfigName('roles'),
		methodSaveForm: pageParams.id === 'new' ? 'POST' : 'PUT',
		onFinish: onFinish,
		processBeforeSaveForm: processBeforeSaveForm,
		header: [
			{
				componentType: 'Item',
				child: {
					componentType: 'Title',
					label: 'Информация о пользователе',
					className: 'mb-0',
					level: 3,
				},
			},
		],
		body: [...fields, ...roles],
		footer: [
			{
				componentType: 'Item',
				child: {
					componentType: 'Button',
					label: 'Закрыть',
					className: 'mr-8',
					onClick: () => history.push(paths.USERS.path),
				},
			},
			{
				componentType: 'Item',
				child: {
					componentType: 'Button',
					label: 'Сохранить',
					type: 'primary',
					htmlType: 'submit',
				},
			},
		],
	};

	return (
		<BasePage>
			<Form {...formConfig} />
		</BasePage>
	);
};

RoleEdit.propTypes = {};

export default RoleEdit;
