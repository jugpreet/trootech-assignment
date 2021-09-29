import { createStore ,applyMiddleware} from 'redux';
import reducer from './Reducers';
import thunk from 'redux-thunk';
export default function configureStore(initialState={}) {
 return createStore(
   reducer,
   applyMiddleware(thunk)
 );
}