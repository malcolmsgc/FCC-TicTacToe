import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Header from './components/Header/Header.js';
import NumPlayers from './screens/NumPlayers.js';
import EnterName from './screens/EnterName.js';
import notFound from './screens/notFound.js';
import './app.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={NumPlayers} />
            <Route path="/names" component={EnterName} />
            <Route component ={notFound} />
          </Switch>
        </BrowserRouter>
        
      </div>
    );
  }
}

export default App;
