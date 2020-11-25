import {genericRequest} from './network';

let prefixGetData = '/api/management/data';
let prefixGetConfigs = '/api/management/configuration';
let prefixSaveConfigs = `/api/management/configuration/save`;

/** GET API */

// url: '/api/advanced/dynamic/configuration',
export const apiGetAllConfiguration = ({data, params}) =>
	genericRequest({url: `${prefixGetConfigs}`, method: 'GET', data, params});

// url: '/api/advanced/dynamic/configuration/' + configId,
export const apiGetConfigurationByName = (configName) => () =>
	genericRequest({url: `${prefixGetConfigs}/${configName}`, method: 'GET'});

// url: '/api/advanced/dynamic/configuration',
export const apiSaveConfiguration = ({data, params}) =>
	genericRequest({url: `${prefixGetConfigs}`, method: 'POST', data, params});

// url: `/api/advanced/dynamic/configuration/table/${id}`,
export const apiDeleteConfiguration = ({id, data, params}) =>
	genericRequest({
		url: `${prefixGetConfigs}/table/${id}`,
		method: 'DELETE',
		data,
		params,
	});

export const apiGetDbTable = () =>
	genericRequest({url: `${prefixGetConfigs}/db/tables`, method: 'GET'});

export const apiGetDbFieldsByTable = (tableName) =>
	genericRequest({
		url: `${prefixGetConfigs}/db/fields/${tableName}`,
		method: 'GET',
	});

/** SAVE API */
export const apiGetAllSaveConfigurations = ({data, params}) =>
	genericRequest({url: `${prefixSaveConfigs}`, method: 'GET', data, params});

export const apiGetSaveConfigurationByName = (configName) => () =>
	genericRequest({url: `${prefixSaveConfigs}/${configName}`, method: 'GET'});

export const apiCreateSaveConfiguration = (configName) => ({data}) =>
	genericRequest({url: `${prefixSaveConfigs}`, method: 'POST', data});

export const apiDeleteSaveConfiguration = (configName) => ({data, params}) =>
	genericRequest({
		url: `${prefixSaveConfigs}/${configName}`,
		method: 'DELETE',
		data,
		params,
	});

/** GET DATA API */
export const apiGetFlatDataByConfigName = (configName) => ({data, params}) =>
	genericRequest({
		url: `${prefixGetData}/flat/${configName}`,
		method: 'POST',
		data,
		params,
	});

export const apiGetHierarchicalDataByConfigName = (configName) => ({
	data,
	params,
}) =>
	genericRequest({
		url: `${prefixGetData}/hierarchical/${configName}`,
		method: 'POST',
		data,
		params,
	});

// url: `/api/advanced/dynamic/data/
export const apiDataGetByConfigName = ({config, data, params}) => {
	const typeData =
		config.hierarchical && !config.hierarchyLazyLoad
			? 'hierarchical'
			: 'flat';
	return genericRequest({
		url: `${prefixGetData}/${typeData}/${config.configName}`,
		method: 'POST',
		data,
		params,
	});
};

/** SAVE DATA API */
export const apiSaveDataByConfigName = (configName) => ({
	method,
	data,
	params,
}) =>
	genericRequest({
		url: `${prefixGetData}/save/${configName}`,
		method: method,
		data,
		params,
	});
