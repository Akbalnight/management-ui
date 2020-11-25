import {apiSaveDataByConfigName} from '../../apis/dynamicdq.apis';

export const changePasswordModal = {
	title: 'Смена пароля',
	requestSaveRow: apiSaveDataByConfigName('setPassword'),
	width: 550,
	form: {
		labelCol: {span: 8},
		wrapperCol: {span: 16},
		body: [
			{
				componentType: 'Item',
				label: 'Пароль',
				name: 'password',
				rules: [
					{
						message: 'Заполните пароль',
						required: true,
					},
				],
				child: {componentType: 'Password'},
			},
			{
				componentType: 'Item',
				label: 'Подтверждение пароля',
				name: 'confirm',
				dependencies: ['password'],
				rules: [
					{
						message: 'Заполните пароль',
						required: true,
					},
					({getFieldValue}) => ({
						validator(rule, value) {
							if (!value || getFieldValue('password') === value) {
								return Promise.resolve();
							}
							return Promise.reject('Пароли должны совпадать');
						},
					}),
				],
				child: {componentType: 'Password'},
			},
		],
	},
};
