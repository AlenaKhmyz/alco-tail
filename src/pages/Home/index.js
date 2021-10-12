import '../../scss/pages/_home.scss'

import React from 'react'
import { Link } from 'react-router-dom';
import { ROUTES } from '../../const'
import BarPage from '../barPages/Bar'

function HomePage() {

    return(
        <div className="home">
            
                <Link to = {ROUTES.BAR} className="home__bar">Bar</Link>
                <Link to = {ROUTES.KITCHEN} className="home__kitchen">Kitchen</Link>
        </div>
    )
}

export default HomePage;