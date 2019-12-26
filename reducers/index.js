import {createStore, combineReducers} from 'redux';
import EmployeeListReducer from './employee-list-reducer';
import EmployeeDetailsReducer from './employee-details-reducer';

const reducers = combineReducers({
    employeeList:EmployeeListReducer,
    employeeDetails:EmployeeDetailsReducer,

})

const reducersStore = createStore(reducers);


export default reducersStore