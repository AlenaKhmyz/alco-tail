import React from 'react'
import { Link } from 'react-router-dom';
import { ROUTES } from '../../const'
import BarPage from '../barPages/Bar'

function HomePage() {

    return(
        <div className="home">
                <Link to = {ROUTES.BAR}>Бар</Link>
                <Link to = {ROUTES.KITCHEN} >Кухня</Link>
        </div>
    )
}

export default HomePage;