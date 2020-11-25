export const inputs = {
	componentType: 'Item',
	label: 'Код',
	name: 'code',
	rules: [
		{
			message: 'Заполните код',
			required: true,
		},
	],
	child: {componentType: 'InputNumber'},
};

export const nameInput = {
	componentType: 'Item',
	label: 'Наименование',
	name: 'name',
	rules: [
		{
			message: 'Заполните наименование',
			required: true,
		},
	],
	child: {componentType: 'Input'},
};
