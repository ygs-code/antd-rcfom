import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import  Routes from  './routes/Routes';

function App() {
  return (

         <Routes/>

  );
}

export default App;
