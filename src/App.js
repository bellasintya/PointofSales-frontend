import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Components/Home';
import History from './Components/History';
import AddProduct from './Components/AddProduct';
import ProductTable from './Components/ProductTable';
import CategoryTable from './Components/CategoryTable';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
//for JWT
import AuthenticatedComponent from './Components/AuthenticatedComponent';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        {/* hit one route and then stop */}
        <Switch>
          <Route exact path="/" component={RegisterPage} />
          <Route path="/LoginPage" component={LoginPage} />
          <AuthenticatedComponent>
            <Route path="/Home" component={Home} />
            <Route path="/History" component={History} />
            <Route path="/AddProduct" component={AddProduct} />
            <Route path="/ProductTable" component={ProductTable} />
            <Route path="/CategoryTable" component={CategoryTable} />
          </AuthenticatedComponent>
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
