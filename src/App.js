import logo from './logo.svg';
import './App.css';
import {Route, BrowserRouter, Switch, Link} from 'react-router-dom';

import { ROUTES } from './const'

import BarPage from './pages/barPages/Bar'
import HomePage from './pages/Home'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path={ROUTES.BAR}>
            <BarPage />
          </Route>
          <Route path={ROUTES.HOME} component={HomePage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
