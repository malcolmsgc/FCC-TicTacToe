import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Header from './Header.js';

const notFound = () => {
        return (
        <div className="App">
            <Header />
            <h3>Oops, we couldn't find that page.</h3>
            <p>2 player link not working? Please check the link is correct.</p>
        </div>
    );
}


export default notFound;