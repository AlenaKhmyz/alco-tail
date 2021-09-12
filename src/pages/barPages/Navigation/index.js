
import React from 'react';
import {Route, BrowserRouter, Switch, Link} from 'react-router-dom';
import '../../../scss/components/_navigator.scss'

import { ROUTES } from '../../../const'
import GinPage from '../../barPages/Gin'
import TequilaPage from '../Tequila'
import VodkaPage from '../Vodka'
import WinePage from '../Wine'
import MainPage from '../Bar'
import HomePage from '../../Home'
import CardContainer from '../../../components/barComponents/cardContainer';

function Navigator() {
    return (
        <BrowserRouter>
            <nav className = 'navbar'>
                <Link to = {ROUTES.VODKA} className = 'navbar__link'>Vodka</Link>
                <Link to = {ROUTES.GIN} className = 'navbar__link'>Gin</Link>
                <Link to = {ROUTES.WINE} className = 'navbar__link'>Wine</Link>
                <Link to = {ROUTES.TEQUILA} className = 'navbar__link'>Tequila</Link>
            </nav>
            <Switch>
                
                <Route path={ROUTES.VODKA}>
                    <CardContainer />
                </Route>
                <Route path={ROUTES.GIN}> 
                    <CardContainer />
                 </Route>  
                <Route path={ROUTES.WINE}> 
                    <CardContainer />
                </Route>
                <Route path={ROUTES.TEQUILA}>
                    <CardContainer />
                </Route>
               
            </Switch>
        </BrowserRouter>
    )
}

export default Navigator;