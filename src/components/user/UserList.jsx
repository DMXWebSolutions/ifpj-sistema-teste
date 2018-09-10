import './Modal.css'
import React, { Component } from 'react';
import { Table, Button, Form } from 'semantic-ui-react'
import { api } from '../../services/api'
import Modal from 'react-responsive-modal';


const initialState = {
    list: [],
    profile: 'student',
    modalIsOpen: false,
    classes: []
}


export default class UserList extends Component {

    constructor(){
        super()
    }

    state = { ...initialState }

    openModal(userEdit) {
        this.setState({modalIsOpen: true, userEdit});
    }
    
    closeModal() {
        this.setState({modalIsOpen: false});
    }

    async componentWillMount() {
        try {
            const response = await api.get(`/users`);
            const list = response.data.users
            const classes = await this.getClasses()
            this.setState({ list, classes })
        } catch ( error ) {
            console.log(error.response)
        }
    }

    async getClasses() {

        try {
            const response = await api.get('/classrooms')
            const classrooms = response.data.classes
            const classes = await classrooms.map(e => 
                new Object({key: e.codturm, value: e.codturm, text: e.codturm })
            )

            return await classes

            
        } catch (error) {
            return 'classe não encontrada'
        }
    }

    async removeUser (user) {
        try {
            const response = await api.delete(`/users/${user.register}`)
            const list = this.getUpdateList(user, false)
            this.setState({ list })
        } catch (error) {
            console.log(error)
        }
    }

    getUpdateList(user, add = true) {
        const list = this.state.list.filter( u => u._id !== user._id)
        if(add) list.unshift(user)
        return list
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    renderRowsEmployees() {
        const { list } = this.state
        const employees = employee => employee.profiles !== 'ALUNO'

        return(
            <Table color={'blue'}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Matricula</Table.HeaderCell>
                        <Table.HeaderCell>Nome</Table.HeaderCell>
                        <Table.HeaderCell>Perfil</Table.HeaderCell>
                        <Table.HeaderCell>Opções</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    { list.filter(employees).map(user => (
                        <Table.Row key={user.register}>
                            <Table.Cell>{user.register}</Table.Cell>
                            <Table.Cell>{user.name}</Table.Cell>
                            <Table.Cell>{user.profiles}</Table.Cell>
                            <Table.Cell>
                                <Button content='Remover' onClick={ () => this.removeUser(user)} positive/>
                                <Button content='Editar senha' primary/>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

        )
    }

    renderRowsStudents() {
        const { list} = this.state
        const students = student => student.profiles == 'ALUNO'
        return(
        <React.Fragment>
            <Table color={'blue'}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Matricula</Table.HeaderCell>
                        <Table.HeaderCell>Nome</Table.HeaderCell>
                        <Table.HeaderCell>Turma</Table.HeaderCell>
                        <Table.HeaderCell>Opções</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    { list.filter(students).map(user => (
                        <Table.Row key={user.register}>
                            <Table.Cell>{user.register}</Table.Cell>
                            <Table.Cell>{user.name}</Table.Cell>
                            <Table.Cell>{user.class}</Table.Cell>
                            <Table.Cell>
                                <Button content='Remover' onClick={ () => this.removeUser(user)} positive/>
                                <Button content='Editar senha' primary onClick={() => this.openModal(user)} />
                            </Table.Cell>
                            
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </React.Fragment>
        )
    }


    renderModal() {
        const { modalIsOpen, userEdit, classes } = this.state;
        if(userEdit !== undefined ) {
            return (
                <Modal open={modalIsOpen} onClose={() => this.closeModal() } center>
                    <br/><br/>
                    <h2>{userEdit.name} - {userEdit.register}</h2>
                    <br/>
                    <Form>
                        <Form.Field>
                            <Form.Input type='password' label='NOVA SENHA'  placeholder='Digite a nova senha '/>
                        </Form.Field>
                        <Form.Field>
                            <Form.Dropdown label='TURMA' options={classes} defaultValue={userEdit.class} 
                                fluid
                                search 
                                allowAdditions 
                                selection
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Button positive>Salvar</Form.Button>
                        </Form.Field>
                    </Form>
                </Modal>
            );
        }
    }

    render() {
        const { profile} = this.state

        return(
            <React.Fragment>

                <Button.Group size='large'>
                    <Button name='profile' value='student' onClick={ this.handleChange}>Aluno</Button>
                    <Button.Or text='ou' />
                    <Button name='profile' value='employee' onClick={ this.handleChange}>Funcionario</Button>
                </Button.Group>

                { profile === 'student'? this.renderRowsStudents() : this.renderRowsEmployees()}

                {this.renderModal()}
                
            </React.Fragment>
        )
    }



}