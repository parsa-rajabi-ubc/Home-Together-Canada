import './App.css';
import React from 'react'
import Header from './common/header and footer/Header';
import Home from './home/Home';
import Footer from './common/header and footer/Footer';

function App() {
    return (
        <div className="App">
            <Header/>
            <Home/>
            <Footer/>
        </div>
    );
}

export default App;
