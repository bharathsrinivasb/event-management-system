import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import EventForm from './components/EventForm';
import SignupForm from './components/SignupForm';
import Login from './components/Login';
import { BrowserRouter } from "react-router-dom";
import Header from './components/Header';
import Events from './components/Events';
import BookNow from './components/BookNow';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
 
    <App/>

    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
