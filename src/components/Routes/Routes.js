import React from 'react';
import {Redirect, Route, Switch} from 'react-router';
import {paths} from '../../constants/paths';

const Routes = () => {
	return (
		<Switch>
			{/** Главная */}
			<Route
				exact
				path={paths.HOME.path}
				component={paths.HOME.component}
			/>
			<Route
				exact
				path={paths.DEBUG_LIB.path}
				component={paths.DEBUG_LIB.component}
			/>
			<Route
				exact
				path={paths.USERS.path}
				component={paths.USERS.component}
			/>
			<Redirect exact from='/' to={paths.HOME.path} />
			<Redirect
				exact
				from={paths.PATH_PREFIX.path}
				to={paths.HOME.path}
			/>
		</Switch>
	);
};
Routes.propTypes = {};

Routes.defaultProps = {};

export default Routes;
