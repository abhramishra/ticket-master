import React from 'react'

import LogoImage from '../../assets/Images/help-desk-tickets.webp';
function Home(props) {
    return (
        <div className="container">
            <img src={LogoImage} style={{ width: '100%' }}/>
        </div>
    )
}
export default Home