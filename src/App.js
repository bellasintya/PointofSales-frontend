import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Components/Home';
import History from './Components/History';
import AddProduct from './Components/AddProduct';
import ProductTable from './Components/ProductTable';
import CategoryTable from './Components/CategoryTable';
import SignInPage from './Components/SignInPage';
import SignUpPage from './Components/SignUpPage';
import Notifications from './Components/Notifications';
//for JWT
import Authentication from './Helpers/Authentication';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        {/* hit one route and then stop */}
        <Switch>
          <Route exact path="/" component={SignUpPage} />
          <Route path="/SignInPage" component={SignInPage} />
          <Route path="/Notifications" component={Notifications} />
          <Authentication>
            <Route path="/Home" component={Home} />
            <Route path="/History" component={History} />
            <Route path="/AddProduct" component={AddProduct} />
            <Route path="/ProductTable" component={ProductTable} />
            <Route path="/CategoryTable" component={CategoryTable} />
          </Authentication>
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
