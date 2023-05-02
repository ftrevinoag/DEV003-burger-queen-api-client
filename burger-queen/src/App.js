import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import LogIn from './components/login/LogIn';
import Categories from './components/Categories';
import Menu from './components/order/Menu';
import KitchenOrder from './components/kitchen/KitchenOrder';
import OrderReady from './components/order/OrderReady';
import UserList from './components/admin/users/UserList';
import ProductList from './components/admin/products/ProductList';
import NotFound from './components/NotFound';
import './style/style.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route path="/" exact>
            <LogIn />
          </Route>
          <Route path="/categories">
            <Categories />
          </Route>
          <Route path="/menu">
            <Menu />
          </Route>
          <Route path="/kitchen">
            <KitchenOrder />
          </Route>
          <Route path="/orders">
            <OrderReady />
          </Route>
          <Route path="/userlist">
            <UserList />
          </Route>
          <Route path="/productlist">
            <ProductList />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
