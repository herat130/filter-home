import { combineReducers } from 'redux';
import apartmentsListReducer from './apartmentsListReducer';
import apartmentReducer from './apartmentReducer';
import searchReducer from './searchReducer';

export default combineReducers({
    apartmentsList: apartmentsListReducer,
    apartmentItem: apartmentReducer,
    searchReducer: searchReducer,
})
