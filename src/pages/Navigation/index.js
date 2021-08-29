
import React from 'react';
import {Route, BrowserRouter, Switch, Link} from 'react-router-dom';
import '../../scss/components/_navigator.scss'

import { ROUTES } from '../../const'
import GinPage from '../Gin'
import TequilaPage from '../Tequila'
import VodkaPage from '../Vodka'
import WinePage from '../Wine'
import CardContainer from '../../components/cardContainer';

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
                    <CardContainer name="vodka"/>
                </Route>
                <Route path={ROUTES.GIN}> 
                    <CardContainer name="gin"/>
                 </Route>  
                <Route path={ROUTES.WINE}> 
                    <CardContainer name="wine"/>
                </Route>
                <Route path={ROUTES.TEQUILA}>
                    <CardContainer name="tequila"/>
                </Route> 
            </Switch>
        </BrowserRouter>
    )
}

export default Navigator;