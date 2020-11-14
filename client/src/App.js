import './App.css';
import React from 'react'
import Header from './common/header-and-footer/Header';
import Home from './home/Home';
import Footer from './common/header-and-footer/Footer';
import BusinessRegistrationForm from "./registration/BusinessRegistrationForm";

function App() {
  return (
    <div>
      <Header/>
      <Home/>
      <Footer/>
    </div>
  );
}

export default App;
