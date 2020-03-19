import { createStore,applyMiddleware,compose } from 'redux'
import reducers from './reducers'
import thunk from "redux-thunk";
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

const logger = createLogger({
    collapsed:true
});
// eslint-disable-next-line no-mixed-operators
const composeEnhancers =typeof window === 'object' && composeWithDevTools || compose;
const enhancers = composeEnhancers(applyMiddleware(thunk,logger));
const store = createStore(
    reducers,
    enhancers
);

export default store