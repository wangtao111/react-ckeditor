import "babel-polyfill"
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'mobx-react'
import { BrowserRouter } from 'react-router-dom'
import Store from './store'
import zhCN from 'antd/lib/locale-provider/zh_CN';
// import registerServiceWorker from './registerServiceWorker'
import $ from 'jquery';
import api from './api/api';
import { LocaleProvider } from 'antd';
window.jQuery = $;
window.$ = $;
window.confirm = () => { };
console.error = (function () {
  const error = console.error
  return function (exception) {
    if ((exception + '').indexOf('Warning:') != 0) {
      error.apply(console, arguments)
    }
  }
})()
React.Component.prototype.$api = api;
const Wrap = (
  <Provider {...new Store()}>
    <BrowserRouter basename="/">
      <LocaleProvider locale={zhCN}>
        <App />
      </LocaleProvider>
    </BrowserRouter>
  </Provider>
)
ReactDOM.render(
  Wrap,
  document.getElementById('root')
)
  // registerServiceWorker()
