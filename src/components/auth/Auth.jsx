import './Auth.css'
import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import { browserHistory } from 'react-router'
import { api } from '../../services/api'
import { setUserData, setToken } from '../../utils/sessionStorages'
import { AuthConsumer } from './AuthContext'

import { toast, ToastContainer } from 'react-toastify';
import logo from '../../assets/imgs/logo2.png'

export default class Auth extends Component {

    state = { register: '', password: ''}


    componentDidMount() {
        sessionStorage.clear();
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    errorMessage = (message) => {
        toast.error(message , {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        })
    }

    renderForm = () => {
        return(
            <div>
                <AuthConsumer>
                    {({ isAuth, login, register, password, onRegisterChange, onPasswordChange, isError, errorMessage }) => (

                        <Form onSubmit={login}>
                            <Form.Field>
                                <Form.Input 
                                    icon='user' 
                                    size='large' 
                                    label={<p className='label' >Matricula</p>} 
                                    placeholder='Digite sua matricula' 
                                    name='register' 
                                    onChange={e => onRegisterChange(e)} 
                                    value={register}
                                    required={true}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input 
                                    icon='lock' 
                                    size='large' 
                                    type='password' 
                                    label={<p  className='label' >Senha</p>} 
                                    placeholder='Digite sua senha'
                                    name='password' 
                                    onChange={e => onPasswordChange(e)} 
                                    value={password}
                                    required={true}
                                />
                            </Form.Field>
                            <Form.Button fluid size='large' content='Enviar' positive />
                        </Form>
                    )}
                </AuthConsumer>
            </div>
        )
    }

    render() {
        const { history } = this.props;

        return(
            <AuthConsumer>
                {({ isAuth, isError, errorMessage }) => (  
                    !isAuth ?
                    <div className="wrapper">
                        <div className="boxContent">
                            <div className="logoContent">
                                <img src={logo}/>
                            </div>
                            <div className="formContent">
                                { this.renderForm() }
                            </div>
                        </div>
                        <ToastContainer autoClose={false} />
                        { isError? this.errorMessage(errorMessage): null }
                    </div>
                    : history.push('/home')
                )}
            </AuthConsumer>

        )


    }
}