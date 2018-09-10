import React, { Component } from 'react';
import Main from '../template/Main'
import { Tab } from 'semantic-ui-react'
import { NotificationProvider } from './NotificationsContext'

import NotificationsSend from './NotificationsSend'
import NotificationList from './NotificationsList'



const headerProps = {
    icon: 'bell',
    title: 'Notificações',
    subtitle: 'Envia, lista e deleta comunicados'
}

const panes = [
    {menuItem: 'Listar Comunicados', render: () => 
        <Tab.Pane attached={false}>
            <NotificationList/>
        </Tab.Pane>
    },

    {menuItem: 'Enviar Comunicados por Turma', render: () => 
        <Tab.Pane attached={false}> 
            <NotificationsSend/>
        </Tab.Pane>
    },

    {menuItem: 'Enviar Comunicados por Aluno', render: () => 
        <Tab.Pane attached={false}> 
            <NotificationsSend/>
        </Tab.Pane>
    },
]

export default class Notifications extends Component {
    render() {
        return (
            <Main {...headerProps}>
                <Tab menu={{ pointing: true }} panes={panes} />
            </Main>
        )
    }
}