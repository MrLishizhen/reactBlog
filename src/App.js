import React from 'react';
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import './App.css';
import loadbleFunc from "./util/loadble";
// import Login from './pages/Login';
// import Home from './pages/Home'

const Login =loadbleFunc(()=>import('./pages/Login'))
const Home = loadbleFunc(()=>import('./pages/Home'))
// import empty from "./pages/404";

function App() {
  return (
    <div className="App">
      <Router basename="servere">
        <Switch>
            <Route path='/login' component={Login}></Route>
            <Route path='/home' component={Home}></Route>
            <Redirect to='/login'></Redirect>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
