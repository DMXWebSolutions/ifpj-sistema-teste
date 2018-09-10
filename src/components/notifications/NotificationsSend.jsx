import React, { Component } from 'react';
import { api } from '../../services/api'
import { Dropdown, Form, Button, TextArea } from 'semantic-ui-react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserData } from '../../utils/sessionStorages'


const initialState = { classroom: '', title: '', message: ''}

export default class NotificationsSend extends Component {
    constructor(props) {
        super(props)
        this.state = {
            classList: [],
            classroom: '',
            title: '',
            message: '',
            user: {}
        }
    }

    async componentDidMount() {
        try {
            const user = await getUserData()
            const classList = await this.getClassesList()
            this.setState({ classList, user })
        } catch (error) {
            console.log(error)
        }
    }

    async getClassesList() {

        const user = await getUserData()
        const response = user.profiles === 'ADMIN' ? await api.get(`/classrooms`) : await api.get(`/teachers/${user.register}/classrooms`)
        const list = response.data.classes.map(e => 
            new Object({key: e.codturm, value: e.codturm, text: e.codturm })
        )
        return list
    }

    async sendNotification() {
        const { classroom, title, message, user } = this.state

        console.log(user)

        try {
            
            const response = await api.post('/notifications/classroom', {
                "register": user.register,
                "title": title,
                "classroom": classroom,
                "message": message
            })

            console.log(response.request.status)

            const msg = response.status === 200 ? 'Notificação Enviada com sucesso': 'Erro ao Enviar notificação'

            toast.info(msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
            this.setState({ ...initialState })
        
        } catch (error) {
            console.log(error.response)
        }
    }
    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    render() {
        const { classList } = this.state
        return(
            <React.Fragment>
                <ToastContainer autoClose={false} />
                <Form>
                    <Form.Group>
                        <Form.Field width={4}>
                            <Dropdown
                                fluid
                                search 
                                name='classroom'
                                onChange={this.handleChange}
                                options={classList !== undefined ? classList : []}
                                selection
                                placeholder='Escolha a turma'
                            />
                        </Form.Field>
                        <Form.Field width={8}>
                            <Form.Input
                                fluid
                                name='title'
                                onChange={this.handleChange}
                                placeholder='Titulo da notificação'
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Field>
                        <TextArea 
                            placeholder='Escreva o conteudo da notificação' 
                            style={{ minHeight: 100 }} 
                            name='message'
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Button positive onClick={() => this.sendNotification() }>Enviar Notificação</Button>
                </Form>
            </React.Fragment>
        )
    }
}