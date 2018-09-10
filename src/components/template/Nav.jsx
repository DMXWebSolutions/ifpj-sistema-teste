import './Nav.css'
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { getUserData } from '../../utils/sessionStorages'
import MyUserOptions from '../user/MyUserOptions'
import logo from '../../assets/imgs/logo.png'
import { Image } from 'semantic-ui-react'
import { AuthConsumer } from '../auth/AuthContext';


const PrivateLinks = props => (
    <AuthConsumer>
        {({ userData }) => (
            userData.profiles === props.authorize 
            ? props.children
            : null
        )}
    </AuthConsumer>
)

export default class NavMenu extends Component {

    render() {
        return(
            <AuthConsumer>
                {({ userData, logout }) => (
                    <aside className="menu-area">
                        <div className="user-box">
                            <Image circular={true} size={'tiny'} src={logo} /> 

                            <p>{userData.name}</p>
                        </div>

                        <nav className="menu">

                            <Link to="/home">
                                <i className="fa fa-home"></i> Inicio
                            </Link>

                            <PrivateLinks authorize="ADMIN">
                                <Link to="/users">
                                    <i className="fa fa-users"></i>Usuarios
                                </Link>
                            </PrivateLinks>

                            <Link to="/notifications">
                                <i className="fa fa-bell"></i>Notificações
                            </Link>
                            
                            <a href="#" className="logout" onClick={logout}>
                                <i className="fas fa-user-tie logout" ></i> <span  className="logout">Sair</span>
                            </a>
                            
                    
                        </nav>
                    </aside>
                )} 
            </AuthConsumer>
        )
    }

}