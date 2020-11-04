import React from 'react';
import '../tailwind.output.css';
import logo from '../images/logo.png';

const Header = () => {
    return (
        <>
            <div className="relative">
                <div>
                    <a href="#" className="flex">
                        <img src={logo} alt="Home Together Canada">
                        </img>
                        <a href="#">Home Together Canada</a>
                    </a>
                </div>
                <nav>
                    <a href="#">Connect with Members </a>
                    <a href="#">Services </a>
                    <a href="#">Classifieds </a>
                    <a href="#">About Us </a>
                    <a href="#">FAQ </a>
                </nav>
                <div>
                    <span> <button href="#"> Sign in </button> </span>
                    <span> <button href="#"> Sign Up </button> </span>
                </div>
            </div>
        </>
    )
}

export default Header;