import React from 'react';
import {
	apiGetConfigurationByName,
	apiGetFlatDataByConfigName,
} from '../../apis/dynamicdq.apis';
import {BasePage} from 'mobile-inspections-base-ui';
import {Form} from 'rt-design';
import {useHistory} from 'react-router';
import {addPermissions, editPermissions} from './PermissionsModals';

const Permissions = (props) => {
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
								'permissions'
							),
							requestLoadConfig: apiGetConfigurationByName(
								'permissions'
							),
							commandPanelProps: {
								systemBtnProps: {
									add: {actionType: 'modal'},
									edit: {actionType: ['modal', 'modal']},
								},
							},
							modals: [addPermissions(), editPermissions()],
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

export default Permissions;
