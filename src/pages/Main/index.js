import React from 'react'
import Search from '../../components/search'
import CardContainer from '../../components/cardContainer';

function MainPage() {

    return(
        <div className="main">
            <Search />
            <CardContainer />
        </div>
    )
}

export default MainPage;