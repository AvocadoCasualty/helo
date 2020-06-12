import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './Nav.css'


class Nav extends Component{
    constructor() {
        super();
    }
    render() {
        return (
            <div className="Nav">
                <Link to='/dashboard'> Home </Link>
                <Link to='/new'> New Post </Link>
                <Link to='/'> Logout </Link>
            </div>
        );
    }
}

export default Nav;