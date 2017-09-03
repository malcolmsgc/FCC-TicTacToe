import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App.js';
import notFound from './components/notFound.js';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const Root = () => (
    <BrowserRouter>
            <Switch>
                <Route exact path="/" component ={App} />
                <Route component ={notFound} />
            </Switch>
      </ BrowserRouter>
)

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
