import './Header.css'
import React from 'react'
import MyUserOptions from '../user/MyUserOptions'
import logo from '../../assets/imgs/logo.png'
import { Link } from 'react-router-dom'
import { Image } from 'semantic-ui-react'

const trigger = (
    <span>
      <Image avatar src={logo} /> {'usuário'}
    </span>
)
  

export default props =>
    <header className="header">
        <div className="logo-content">
            <Link to="/home" className="logo">
                {/* <h1>IFPJ </h1> */}
                <img src={logo}/>
            </Link>
        </div>

        <nav className="nav-bar">

        </nav> 

        <div className="user-options">
            <MyUserOptions trigger={trigger}/>
        </div>

    </header>                     
