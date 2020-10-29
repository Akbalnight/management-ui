import {combineReducers} from 'redux';
import {demo} from './demo.reducer';
import {authReducer} from 'mobile-inspections-base-ui';

const reducer = combineReducers({
	auth: authReducer,
	demo,
});

export default reducer;
