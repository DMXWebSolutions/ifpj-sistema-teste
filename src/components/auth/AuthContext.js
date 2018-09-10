import React, { Component } from 'react';
import { api } from '../../services/api'
import { setUserData, setToken } from '../../utils/sessionStorages'

const AuthContext = React.createContext();

class AuthProvider extends Component {
    state = { 
        isAuth: false, 
        isError: false,  
        errorMessage: '',
        register: '',
        password: '', 
        userData: [] 
    }

    constructor(props) {
        super()
    }

    profileVerify(profile) {
        if( profile === 'ADMIN')
            return this.setState({ isAuth: true });

        if ( profile === 'PROFESSOR')
            return this.setState({ isAuth: true });

        if (profile !== "ADMIN" || "PROFESSOR") {
            return this.setState({ 
                isAuth: false,
                isError: true,
                register: '',
                password: '',
                errorMessage: 'Usuário não está autorizado a acessar o sistema'
            });

        }
    }

    async login(userLogin) {
        const { register, password } = this.state;

        try {
            const response = await api.post('/authenticate', {
                register: register,
                password: password
            });

            const user = response.data.user;
            const token = response.data.token;
            this.profileVerify(user.profiles);
            setToken(token);
            setUserData(user);
            this.setState({ userData: user });

        } catch (error) {
            this.setState({ 
                isAuth: false,
                isError: true,
                register: '',
                password: '',
                errorMessage: error.response.data.error
            });

            this.setState({ isError: false})
        }
    }

    logout = () => this.setState({ isAuth: false });

    render() {
        return(
            <AuthContext.Provider
                value={{
                    isAuth: this.state.isAuth,
                    login: e => this.login(e.target.value),
                    logout: this.logout,
                    register: this.state.register,
                    password: this.state.password,
                    userData: this.state.userData,
                    isError: this.state.isError,
                    errorMessage: this.state.errorMessage,
                    onRegisterChange: e => this.setState({ register: e.target.value }),
                    onPasswordChange: e => this.setState({ password: e.target.value }),
                }}
            >
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer }
