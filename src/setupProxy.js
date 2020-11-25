const {createProxyMiddleware} = require('http-proxy-middleware');

// const API_URL = 'https://mobinspect.dias-dev.ru';
const API_URL = 'http://10.5.121.117';

const OAUTH_URL = 'https://oauth.dias-dev.ru';
const LOCAL_API_URL = 'http://localhost';

// http://localhost:8080/configurable/configuration/getAll

module.exports = function (app) {
	app.use(
		'/api/dynamicdq',
		createProxyMiddleware({
			target: `${API_URL}:8804/dynamicdq`,
			pathRewrite: {'^/api/dynamicdq': ''},
		})
	);
	app.use(
		'/api/logging-server',
		createProxyMiddleware({
			// 'http://10.5.121.117:8806/logging-server/app-logs'
			target: `${API_URL}:8806/logging-server`,
			pathRewrite: {'^/api/logging-server': ''},
		})
	);
	app.use(
		'/api/management',
		createProxyMiddleware({
			target: `${LOCAL_API_URL}:8807/management`,
			pathRewrite: {'^/api/management': ''},
		})
	);
	app.use(
		'/api/oauth',
		createProxyMiddleware({
			target: `${OAUTH_URL}/oauth`,
			pathRewrite: {'^/api/oauth': ''},
			changeOrigin: true,
			secure: false,
		})
	);
};
