import React, {useState} from 'react';
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
import {changePasswordModal} from './changePasswordModal';
import {uuid} from '../../utils/baseUtils';

const UserEdit = () => {
	const pageParams = useParams();
	const history = useHistory();
	const [username, setUsername] = useState('');

	const loadData = (callBack) => {
		if (pageParams.id === 'new') {
			callBack({});
		} else {
			apiGetFlatDataByConfigName('users')({
				data: {id: pageParams.id},
			})
				.then((response) => {
					// console.log("loadData => response ", response.data);
					let data = response.data[0];
					data.jsonData = JSON.parse(response.data[0].jsonData);
					data.roles = JSON.parse(response.data[0].roles); // response.data[0].roles.split(', ');
					// if(data.roles.length > 0) data.roles.map(item)

					setUsername(data.id);
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

	const loadRoles = ({params, data}) => {
		// if(pageParams.id !== 'new') {
		const newData = {
			...data,
			userId: pageParams.id === 'new' ? uuid() : pageParams.id,
		};
		return apiGetFlatDataByConfigName('userRoles')({
			data: newData,
			params,
		});
		// }
	};

	const processBeforeSaveForm = (rawValues) => {
		let data = rawValues;
		data.jsonData = JSON.stringify(data.jsonData); //mobileApp
		if (data.ldap === undefined) data.ldap = false;
		// for(let role in data.roles) {
		//     role.userRoleId =
		// }
		// data.roles =  JSON.stringify(data.roles);
		return data;
	};

	const passwordField = {
		componentType: 'Col',
		span: 8,
		children: [
			{
				componentType: 'Item',
				label: 'Пароль',
				name: 'password',
				rules: [
					{
						message: 'Заполните наименование',
						required: true,
					},
				],
				child: {componentType: 'Password'},
			},
		],
	};

	const passwordChangeModal = {
		componentType: 'Col',
		span: 8,
		style: {
			display: 'flex',
			alignItems: 'center',
		},
		children: [
			{
				componentType: 'Item',
				child: {
					componentType: 'Modal',
					buttonProps: {label: 'Сменить пароль'},
					modalConfig: changePasswordModal,
					modalData: {id: username},
					// dispatchPath: 'changePasswordModal'
				},
			},
		],
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
					span: 8,
					children: [
						{
							componentType: 'Item',
							label: 'Имя пользователя',
							name: 'username',
							rules: [
								{
									message: 'Заполните наименование',
									required: true,
								},
							],
							child: {
								componentType: 'Input',
							},
						},
					],
				},
				pageParams.id === 'new' ? passwordField : {},
				{
					componentType: 'Col',
					span: 8,
					children: [
						{
							componentType: 'Item',
							label: 'E-mail',
							name: 'email',
							rules: [
								{
									type: 'email',
									message: 'Заполните email',
									required: true,
								},
							],
							child: {componentType: 'Input'},
						},
					],
				},
				pageParams.id !== 'new' ? passwordChangeModal : {},
			],
		},
		{
			componentType: 'Row',
			gutter: [16, 16],
			children: [
				{
					componentType: 'Col',
					span: 8,
					children: [
						{
							componentType: 'Item',
							label: 'Фамилия',
							name: ['jsonData', 'lastName'],
							child: {componentType: 'Input'},
						},
					],
				},
				{
					componentType: 'Col',
					span: 8,
					children: [
						{
							componentType: 'Item',
							label: 'Имя',
							name: ['jsonData', 'firstName'],
							child: {componentType: 'Input'},
						},
					],
				},
				{
					componentType: 'Col',
					span: 8,
					children: [
						{
							componentType: 'Item',
							label: 'Отчество',
							name: ['jsonData', 'middleName'],
							child: {componentType: 'Input'},
						},
					],
				},
			],
		},
		{
			componentType: 'Row',
			gutter: [16, 16],
			children: [
				{
					componentType: 'Col',
					span: 8,
					children: [
						{
							componentType: 'Item',
							label: 'Должность',
							name: ['jsonData', 'position'],
							child: {componentType: 'Input'},
						},
					],
				},
				{
					componentType: 'Col',
					span: 8,
					children: [
						{
							componentType: 'Item',
							label: 'Телефон',
							name: ['jsonData', 'phone'],
							child: {componentType: 'Input'},
						},
					],
				},
				{
					componentType: 'Col',
					span: 8,
					children: [
						{
							componentType: 'Item',
							label: ' ',
							name: 'enabled',
							valuePropName: 'checked',
							child: {
								componentType: 'Checkbox',
								label: 'Активный',
							},
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
					name: 'roles',
					child: {
						componentType: 'LocalTable',
						rowKey: 'roleId',
						selectable: true,
						history,

						// Получение иерархичной таблицы по имени конфигурации
						requestLoadRows: loadRoles,

						// Получение конфигурации по имени
						requestLoadConfig: apiGetConfigurationByName(
							'userRoles'
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
		// history.push(paths.USERS.path);
	};

	const formConfig = {
		name: 'UsersEdit',
		// labelCol: {span: 8},
		// wrapperCol: {span: 16},
		layout: 'vertical',
		loadInitData: loadData,
		requestSaveForm: apiSaveDataByConfigName(
			pageParams.id === 'new' ? 'usersWithPassword' : 'users'
		),
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

UserEdit.propTypes = {};

export default UserEdit;
