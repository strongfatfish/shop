import React from 'react'
import ReactDOM from 'react-dom'
import App from "./App";
import { Provider } from 'react-redux'
import './common/icon.css'
import './style/reset.css'
import store from "./store";
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);