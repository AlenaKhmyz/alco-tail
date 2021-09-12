import React from 'react'
import { Link } from 'react-router-dom';
import { ROUTES } from '../../const'
import BarPage from '../barPages/Bar'

function HomePage() {

    return(
        <div className="home">
                <Link to = {ROUTES.BAR}>Бар</Link>
                <button className="kitchen" >Кухня</button>
        </div>
    )
}

export default HomePage;