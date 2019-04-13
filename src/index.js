import React from 'react';
import ReactDOM from 'react-dom';
import 'moment/locale/zh-cn';
import {Provider} from 'react-redux';
import {LocaleProvider} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import store from '@store';
import App from './App';
import '@scss/base.scss';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <LocaleProvider locale={zh_CN}>
        <Provider store={store}>
            <App />
        </Provider>
    </LocaleProvider>
    , document.getElementById('root'));
serviceWorker.unregister();
