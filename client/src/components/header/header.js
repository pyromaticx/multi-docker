import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './header.css'
export default (props) => {
   
    const paths = props.location.pathname.split('/');
    console.log(paths);

    // just testing out the hooks
    const [open, setOpen] = useState(false);
    return (
        <div className="header-wrapper">
            <div className="brand"></div>
            <div className="menu">
                <Link to="/">
                    <div className={"menu-item " + (paths[1] === '' ? 'active': '')}>
                        <p>Home</p>
                    </div>
                </Link>
                <Link to="/discover">
                    <div className={"menu-item " + (paths[1] === 'discover' ? 'active': '')}>
                        <p>Discover</p>
                    </div>
                </Link>
                <Link to="/broadcast">
                    <div className={"menu-item " + (paths[1] === 'broadcast' ? 'active': '')}>
                        <p>Broadcast</p>
                    </div>
                </Link>
                <Link to="/login">
                    <div className={"menu-item " + (paths[1] === 'login' ? 'active': '')}>
                        <p>Login</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}