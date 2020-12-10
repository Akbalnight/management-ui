import {combineReducers} from 'redux';
import {demo} from './demo.reducer';
import {authReducer} from 'mobile-inspections-base-ui';
import {rtdReducer} from 'rt-design';

const reducer = combineReducers({
	auth: authReducer,
	rtd: rtdReducer,
	demo,
});

export default reducer;
