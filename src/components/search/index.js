import React from 'react'

const Search = (props) => {
    return (
        <form>
            <p>
                <input type="search" className="main__search" placeholder="Site Search" /> 
                <input className="main_btn" type="submit" value="Find" />     
            </p>
        </form>
    );
}

export default Search;