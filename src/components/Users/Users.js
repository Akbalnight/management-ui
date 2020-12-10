import React from 'react';
import {BasePage} from 'mobile-inspections-base-ui';
import {Form} from 'rt-design';
import {useHistory} from 'react-router';
import {Checkbox, Tooltip, Typography} from 'antd';
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
		{
			name: 'rolesForRegistry',
			cellRenderer: ({cellData}) => {
				const roles = cellData ? JSON.parse(cellData) : [];
				return (
					<Tooltip
						title={roles.map((item) => (
							<div key={item.name}>{item.name}</div>
						))}
					>
						<Typography.Text>
							{roles.map((item) => item.name).join(', ')}
						</Typography.Text>
					</Tooltip>
				);
			},
		},
	];

	//id
	// description
	// method
	// path
	// json_data

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
							customColumnProps: customColumnProps,
							history,
							requestLoadRows: apiGetFlatDataByConfigName(
								'users'
							),
							requestLoadConfig: apiGetConfigurationByName(
								'users'
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

Users.propTypes = {};

export default Users;
