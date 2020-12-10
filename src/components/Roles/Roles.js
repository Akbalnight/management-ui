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
							history,
							requestLoadRows: apiGetFlatDataByConfigName(
								'roles'
							),
							requestLoadConfig: apiGetConfigurationByName(
								'roles'
							),
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
