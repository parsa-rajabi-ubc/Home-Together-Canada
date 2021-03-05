import React from 'react'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './redux/reducers';
import Navigation from "./Navigation";

import './App.css';

const store = configureStore({
    reducer: rootReducer
});

function App() {
    return (
        <Provider store={store}>
            <Navigation/>
        </Provider>

    );
}

export default App
