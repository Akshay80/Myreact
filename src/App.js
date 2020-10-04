import React from 'react';
// import logo from './logo.svg';
import SignUp from './components/SignUp'
import Login from './components/Login'
// import './App.css';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <main>
            <Switch>
                <Route path="/" component={SignUp} exact />
                <Route path="/login" component={Login} />
            </Switch>
        </main>
    </div>
  );
}

export default App;
