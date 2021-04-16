import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import rootReducer from './reducers'
import { WEB_SOCKET } from './helpers'
import { ActionCableProvider } from 'react-actioncable-provider'
import actionCable from 'actioncable';

const cableApp = {}
cableApp.cable = actionCable.createConsumer(WEB_SOCKET);

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
ReactDOM.render(
    <Provider store={store}>
      <App cableApp={cableApp}/>
    </Provider>,
  document.getElementById('root')
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// ReactDOM.render(
//   <ActionCableProvider url={WEB_SOCKET}>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </ActionCableProvider>,
//   document.getElementById('root')
// )
