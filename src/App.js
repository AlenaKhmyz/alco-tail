import logo from './logo.svg';
import './App.css';
import {Route, BrowserRouter, Switch, Link} from 'react-router-dom';

import { ROUTES } from './const'

import BarPage from './pages/barPages/Bar'
import KitchenPage from './pages/kitchenPages/Kitchen'
import HomePage from './pages/Home'
import ConstructorPage from './pages/kitchenPages/Constructor'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          
          <Route path={ROUTES.BAR}>
            <BarPage />
          </Route>
          
          <Route path={ROUTES.KITCHEN}>
            <KitchenPage />
          </Route>
          
          <Route path={ROUTES.CONSTRUCTOR}>
            <ConstructorPage />
          </Route>
         
          <Route path={ROUTES.HOME} component={HomePage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
