import './Notifications.css'
import React, { Component } from 'react';
import { Button, Card } from 'semantic-ui-react'
import { api } from '../../services/api'
import { toast, ToastContainer } from 'react-toastify';
import { getUserData } from '../../utils/sessionStorages';
import TextTruncate from 'react-text-truncate';
import Modal from 'react-responsive-modal';
import { AuthConsumer } from '../auth/AuthContext'

export default class NotificationsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            modalIsOpen: false,
        }
    }

    async componentDidMount() {
        const list = await this.getNotificationsList()
        this.setState({ list })
    }

    openModal(notification) {
        this.setState({modalIsOpen: true, notification});
    }
    
    closeModal() {
        this.setState({modalIsOpen: false});
    }

    async getNotificationsList() {
        const user = await getUserData()
        const response = user.profiles === 'ADMIN' ? 
            await api.get('/notifications') : await api.get(`/notifications/teacher/${user.register}`)
        const notificationList = response.data.notifications.results
        return notificationList
    }

    async removeNotification (notification) {
        try {
            const response = await api.delete(`/notifications/${notification._id}`)
            const list = await this.getNotificationsList()
            this.setState({ list })

            const msg = response.request.status === 200 ? 'Notificação removida com sucesso': 'Erro ao remover notificação'
            toast.success(msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
        } catch (error) {
            console.log(error)
        }
    }

    CardNotifications = () => {
        const { list } = this.state
        console.log(list)
        return(
            <Card.Group>
                {
                    list !== undefined
                    ?list.map( notification => (
                        <Card key={notification.id}>
                            <Card.Content>
                                <Card.Header>{ notification.title } - {notification.classroom}</Card.Header>
                                <Card.Meta>{ notification.register }</Card.Meta>
                                <Card.Description >
                                    <TextTruncate
                                        line={2}
                                        truncateText="…"
                                        text={ notification.message}
                                    />
    
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                <Button basic color='green' onClick={() => this.openModal(notification)}>
                                    Ver
                                </Button>
                                <Button basic color='red' onClick={() => this.removeNotification(notification)}>
                                    Deletar
                                </Button>
                                </div>
                            </Card.Content>
                        </Card>
                    ))
                    :null
                }
            </Card.Group>
        )
    }
    // <Card.Group items={items}/>

    renderModal() {
        const { modalIsOpen, notification} = this.state;
        if(notification !== undefined ) {
            return (
                <Modal open={modalIsOpen} onClose={() => this.closeModal() } center>
                <br/>
                    <h2>{notification.title} - {notification.classroom}</h2>
                    <p>{notification.register}</p>
                    <br/>
                    <p>{notification.message}</p>

                </Modal>
            );
        }
    }

    render() {
        return(
            <AuthConsumer>
                {({ isAuth }) => (
                    isAuth
                    ?<div className='notificationsContent'>
                        <ToastContainer autoClose={false} />
                        {this.CardNotifications()}
                        {this.renderModal()}
                    </div>
                    :null

                )}
            </AuthConsumer>
        )
    }
}