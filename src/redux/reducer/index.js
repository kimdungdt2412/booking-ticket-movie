import {combineReducers} from 'redux';
import userReducer from './user';
import listMovieReducer from '../../Container/HomeTemplate/ListMoviePage/module/reducer'

const rootReducer = combineReducers({
    userReducer,
    listMovieReducer,
    
 });
 export default rootReducer;