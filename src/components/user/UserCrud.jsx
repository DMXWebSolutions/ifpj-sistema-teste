import React, { Component } from 'react'
import Main from '../template/Main'
import { Tab } from 'semantic-ui-react'
import UserList from './UserList'
import UserRegister from './UserRegister';

const headerProps = {
    icon: 'users',
    title: 'Usuarios',
    subtitle: 'Cadastro de Usuarios: Incluir, Listar, Alterar e Excluir'
}

const panes = [
    {menuItem: 'Listar Todos', render: () => 
        <Tab.Pane attached={false}>
            <h1>Lista de Usuarios</h1>
            <hr className='mb-4'/>
            <UserList/>
        </Tab.Pane>
    },

    {menuItem: 'Cadastrar Usuarios', render: () => 
        <Tab.Pane attached={false}> 
            <UserRegister/>
        </Tab.Pane>
    },
]

export default class UserCrud extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: ''
        }
    }

    

    render() {
        return (
            <Main {...headerProps}>

                <Tab menu={{ pointing: true }} panes={panes} />

            </Main>
        )
    }
}