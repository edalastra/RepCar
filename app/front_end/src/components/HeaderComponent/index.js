import React from 'react';
import './style.css';
import { Link  } from 'react-router-dom';


const HeaderComponent = ({ history }) => {



    return (
        <>

            <nav>
                <div className="nav-wrapper grey darken-4">
                    <a href="#!" className="brand-logo"><img src="logo.png" alt="logo" className="logo-image" /></a>
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        <li><a href="sass.html">Sobre</a></li>
                        <li><a href="badges.html">Contato</a></li>
                        <li><a href="collapsible.html">Serviços</a></li>
                        <li><Link to='/login/intranet/'>Interno</Link></li>
                    </ul>

                </div>
            </nav>



            <ul className="sidenav" id="mobile-demo">
                <li><a href="sass.html">Sobre</a></li>
                <li><a href="badges.html">Contato</a></li>
                <li><a href="collapsible.html">Serviços</a></li>
               
            </ul>
        </>
    )

}


export default HeaderComponent;