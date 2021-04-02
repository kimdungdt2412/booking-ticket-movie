import {combineReducers} from 'redux';
import userReducer from './user';
import movieReducer from './movie'
import listMovieReducer from '../../Container/HomeTemplate/ListMoviePage/module/reducer'

const rootReducer = combineReducers({
    userReducer,
    listMovieReducer,
    movieReducer
    
 });
 export default rootReducer;