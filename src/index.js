import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router} from 'react-router-dom'
import LoginComponent from './login/login'
import SignupComponent from './signup/signup'
import DashboardComponent from './dashboard/dashboard'

const firebase = require("firebase")
require("firebase/firestore")

firebase.initializeApp({
  apiKey: "AIzaSyAL0P3vif_ef4K54LISY1kzD2isSEwTZGQ",
  authDomain: "chat-app-77b87.firebaseapp.com",
  databaseURL: "https://chat-app-77b87.firebaseio.com",
  projectId: "chat-app-77b87",
  storageBucket: "chat-app-77b87.appspot.com",
  messagingSenderId: "648017805671",
  appId: "1:648017805671:web:e00a15b6519b60ab96afc2",
  measurementId: "G-1JEX2EZWS2"
})

const routing = (
  <Router>
    <div id="routing-container">
      <Route path='/login' component={LoginComponent}></Route>
      <Route path='/signup' component={SignupComponent}></Route>
      <Route path='/dashboard' component={DashboardComponent}></Route>
    </div>
  </Router>
)

ReactDOM.render(
  <React.StrictMode>
    {routing}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
