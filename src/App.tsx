import React, { useState } from "react";
import {
  HashRouter as Router,
  Link,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import Accounts from './components/accounts';
import Customers from './components/customers';
import Orders from './components/orders';
import Postal from './components/postal';
import Products from './components/products';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [token, setToken] = useState('0f37efde47c02420b3ec1456c8056f4e');
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/products">Produkty</Link>
            </li>
            <li>
              <Link to="/orders">Zamówienia</Link>
            </li>
            <li>
              <Link to="/postal">Wysyłki</Link>
            </li>
            <li>
              <Link to="/accounts">Rachunki</Link>
            </li>
            <li>
              <Link to="/customers">Klienci</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/products">
            <Products />
          </Route>
          <Route 
            exact
            path="/orders"
            render={(props) => <Orders {...props } token={token} />}
          />
          <Route path="/orders/:db/:id/:additional" render={(props) => <Orders {...props } token={token} />} />
          <Route path="/orders/:db/:id" render={(props) => <Orders {...props } token={token} />} />
          <Route 
            exact
            path="/postal"
            render={() => <Postal token={token} />}
          />
          <Route 
            exact
            path="/accounts"
            render={() => <Accounts token={token} />}
          />
          <Route path="/customers">
            <Customers />
          </Route>
          <Redirect from="/" to="/products" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
