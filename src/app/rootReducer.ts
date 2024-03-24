import {combineReducers} from 'redux';
import theme from './theme/themeSlice';
import base from './base';

interface RootReducerI {
    asyncReducers?: any;
}

const rootReducer =
    (asyncReducers?: RootReducerI) => (state: any, action: any) => {
        const combinedReducer = combineReducers({
            base,
            theme,
            ...asyncReducers,
        });
        return combinedReducer(state, action);
    };

export default rootReducer;


