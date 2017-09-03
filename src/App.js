import React from 'react';
import logo from './logo.svg';
import Header from './components/Header.js';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <h1>Testing</h1>
      </div>
    );
  }
}

export default App;
