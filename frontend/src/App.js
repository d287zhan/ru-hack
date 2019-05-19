import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Main from './components/Main';
class App extends React.Component {
  state = {
    username: "",
    password: ""
  }

  render() {
    return (
      <div>
        <Navbar />
        <Main />
      </div>
    );
  }
}

export default App;
