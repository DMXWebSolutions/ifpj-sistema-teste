import './Logo.css'
import logo from '../../assets/imgs/logo.png'
import React from 'react'
import { Link } from 'react-router-dom'

export default props => 
    <aside className="logo">
        <Link to="/" className="logo">
            {/* <h1>IFPJ </h1> */}
            <img src={logo}/>
        </Link>
    </aside>