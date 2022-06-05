import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';
// import { slide as Menu } from 'react-burger-menu';

const Navbar = () => {

    const { logout, isLogin } = useContext(AuthContext);
    //eslint-disable-next-line
    return (
        <nav>
            <div className="nav-wrapper navbar blue center col s3 ">
                <a href="/" className="brand-logo left"><span className="logo_left">Новини (News)</span></a>
                
                <div className="button_link col s9">
                {isLogin
                    ? <ul className="right">
                        <li><Link className="btn btn-floating btn-small cyan pulse" to="/posts"><i className="small material-icons right">add</i></Link></li>
                        <li><a href="/" onClick={logout}>Вийти (Log out)</a></li>
                    </ul>

                    : <><ul className="right">
                        <li><Link to="/login">Увійти (Log in)</Link></li>
                    </ul>
                    </>
                }
                </div>
            </div>
        </nav>

    )
};

export default Navbar;