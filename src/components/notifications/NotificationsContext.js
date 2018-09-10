import React, { Component } from 'react';
import { AuthConsumer } from '../auth/AuthContext';
import { getUserData } from '../../utils/sessionStorages';
import { api } from '../../services/api';

const NotificationContext = React.createContext();

export default class NotificationProvider extends Component {
    state = { notifications: [], user: {}, isError: false, errorMessage: '' }
    

    async componentDidMount() {
        const user = getUserData();
        await this.getNotifications();
        this.setState({ user });
    }

    async getNotifications() {
        const { user } = this.state;
        
        if(user.profiles === 'ADMIN') {
            const response = await api.get('/notifications');
            const notifications = await response.data.notifications.user;
            return this.setState({ notifications }) ;
        }

        if(user.profiles === 'PROFESSOR') {
            console.log('chegou aki')
            const response = await api.get(`/notifications/teacher/${user.register}`);
            const notifications = response.data.notifications.user;
            return this.setState({ notifications }) ;
        }

        if(user.profiles !== 'ADMIN' || 'PROFESSOR') {
           return this.setState({
                isError: true,
                errorMessage: 'Não foi possivel carregar as notificações',
            })
        }

    }

    render() {
        return (
            <NotificationContext.Provider
                value={{
                    notifications: this.state.notifications,
                    user: this.state.user
                }}
            >
                {this.props.children}
            </NotificationContext.Provider>
        );
    }
}


const NotificationConsumer = NotificationContext.Consumer;

export { NotificationProvider, NotificationConsumer }
