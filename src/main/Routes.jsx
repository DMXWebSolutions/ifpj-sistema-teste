import './App.css'
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import  { AuthConsumer } from '../components/auth/AuthContext'

import Home from '../components/home/home'
import UserCrud from '../components/user/UserCrud'
import Notifications from '../components/notifications/Notifications'
import Auth from '../components/auth/Auth'

import Nav from '../components/template/Nav'
import Footer from '../components/template/Footer'
import Header from '../components/template/Header'


const RenderPages = props => (
    <div className='app'>
    <Header/>
        <Nav/>
            {props.children}   
        <Footer/>
    </div>
)


const PrivateRoute = ({ component: Component, ...rest }) => (
    <AuthConsumer>
        {({ isAuth }) => (
            <Route
                render={
                    props => 
                        isAuth
                        ? <Component {...props} />
                        : <Redirect to="/login"/>
                }
                {...rest}
            />
        )}

    </AuthConsumer>

)

const Routes = () => (
    <Switch>
        <PrivateRoute exact path='/home' component={() => <RenderPages> <Home/> </RenderPages> }/>
        <PrivateRoute path='/users' component={() => <RenderPages> <UserCrud/> </RenderPages> }/>
        <PrivateRoute path='/notifications' component={() => <RenderPages> <Notifications/> </RenderPages>}/>
        <Route exact path='/login' component={Auth}/>
        <Redirect form='*' to='/login'/>
    </Switch>
)

export default Routes