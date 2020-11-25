import {apiSaveDataByConfigName} from '../../apis/dynamicdq.apis';

const GroupOnServer = (type) => {
	return {
		type: `${type}OnServer`,
		requestSaveRow: apiSaveDataByConfigName('permissions'),
		width: 500,
		form: {
			labelCol: {span: 8},
			wrapperCol: {span: 16},
			loadInitData: (callBack, row) =>
				callBack(type === 'edit' ? row : null),
			body: [
				{
					componentType: 'Item',
					label: 'Описание',
					name: 'description',
					rules: [
						{
							message: 'Заполните наименование',
							required: true,
						},
					],
					child: {componentType: 'Input'},
				},
				{
					componentType: 'Item',
					label: 'Метод',
					name: 'method',
					child: {
						componentType: 'SingleSelect',
						widthControl: 0,
						// heightPopup: 300,
						rowRender: 'name',
						rows: [
							{
								id: 'GET',
								name: 'GET',
							},
							{
								id: 'POST',
								name: 'POST',
							},
							{
								id: 'PUT',
								name: 'PUT',
							},
							{
								id: 'DELETE',
								name: 'DELETE',
							},
						],
					},
				},
				{
					componentType: 'Item',
					label: 'Путь',
					name: 'path',
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
	};
};

export const addPermissions = () => GroupOnServer('add');

export const editPermissions = () => GroupOnServer('edit');
