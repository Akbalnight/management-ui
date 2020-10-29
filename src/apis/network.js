import axios from 'axios';
import {store} from '../store';
import {catchUnAuthError} from 'mobile-inspections-base-ui';
import {paths} from '../constants/paths';

const DEFAULT_HEADERS = {
	'Content-type': 'application/json',
	userId: 1,
};

const getAuth = () => store.getState().auth;
const getAccessToken = () => getAuth().access_token;
const getRefreshToken = () => getAuth().refresh_token;
const setUser = (data) => {
	store.dispatch({
		type: 'SET_USER',
		payload: data,
	});
};

export const instance = axios.create({
	baseURL: '/',
	timeout: 1200000,
	headers: DEFAULT_HEADERS,
});

export const genericRequest = (options) => {
	const accessToken = getAccessToken();
	// console.log('genericRequest.getAuth => ', getAuth);
	const catchParams = {
		refreshToken: getRefreshToken(),
		setUser,
		loginPath: paths.LOGIN.path,
	};
	return instance({
		...options,
		headers: {
			Authorization: accessToken ? `Bearer ${accessToken}` : null,
			...{userId: getAuth() && getAuth().userId ? getAuth().userId : 1},
		},
	})
		.then((response) => response)
		.catch(catchUnAuthError(catchParams, options, accessToken));
};

export const genericTestingRequest = (options) => {
	const accessToken = getAccessToken();
	return instance({
		...options,
		headers: {
			Authorization: accessToken ? `Bearer ${accessToken}` : null,
			...{userId: getAuth() && getAuth().userId ? getAuth().userId : 1},
		},
	});
};
