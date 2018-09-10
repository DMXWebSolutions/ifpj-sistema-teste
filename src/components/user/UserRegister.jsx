import React, { Component } from 'react';
import { Dropdown, Form, Button } from 'semantic-ui-react'
import { api } from '../../services/api'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const profileOptions = [
    { key: 1, text: 'ALUNO', value: 'ALUNO' },
    { key: 2, text: 'PROFESSOR', value: 'PROFESSOR' },
    { key: 3, text: 'ADMIN', value: 'ADMIN' },
]

const initialState = {
    profile: '',
    false: '',
    select2: true,
    select3: true,

    classroom: '',
    user: {},

    password: '',
    message: '',
    save: false,  
}


export default class UserRegister extends Component {
    constructor(props){
        super(props)
    }

    state = {
        profile: '',
        false: '',

        select2: true,
        select3: true,

        classes: [],
        classroom: '',

        usersOptions: [],
        user: {},
        password: '',
        message: '',
        save: false
    }

    async componentDidMount() {

        try {
            const response = await api.get('/classrooms')
            const classrooms = response.data.classes
            const classes = classrooms.map(e => 
                new Object({key: e.codturm, value: e.codturm, text: e.codturm })
            )
            this.setState({ classes })
        } catch (error) {
            console.log(error)
        }
    }

    async userOptions() {
        const { classroom, profile } = this.state
        try {
            if(profile === 'ALUNO') {
                const response = await api.get(`/classrooms/students/${classroom}`)
                const data =  response.data.students
                const allStudents = data.map(student => 
                    new Object({key: student.codalun, value: {register: student.codalun, name: student.nome }, text: student.nome }))
                this.setState({ usersOptions: allStudents})
            } else {
                const response = await api.get('/employees')
                const data =  response.data.employees
                const allEmployees = data.map(employee => 
                    new Object({key: employee.matricula, value: {register: employee.matricula, name: employee.nome }, text: employee.nome }))
                this.setState({ usersOptions: allEmployees})
            }
        } catch (error) {
            console.log(error)
        }
    }

    async save() {
        const { user, profile, password, classroom } = this.state
        try {
            const response = await api.post('/register', {
                name: user.name,
                register: user.register,
                profiles: profile,
                password: password,
                class: classroom !== undefined ? classroom : null
            })

            const message = response.data.error !== undefined ? 
                response.data.error : response.data.message
                
            this.setState({ message: message, save: true })
            toast.info(this.state.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
            this.setState({ ...initialState })

        } catch(error) {
            console.log(error)
            this.setState({ message: error })
        }
    }

    profileHandleChange = (e, { name, value }) => {
        let select2 = value === 'ALUNO' ? false : true
        let select3 = value !== 'ALUNO'  ? false : true
        this.setState({ [name]: value, select2: select2, select3: select3 })
    }

    classHandleChange = (e, { name, value }) => {
        this.setState({ [name]: value, select3: false})
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    render() {
        const { classes, usersOptions, password } = this.state
        return (
        <React.Fragment>
            <ToastContainer autoClose={false} />
            <Form>
                <Form.Group widths='equal'>
                    <Form.Field width={4}>
                        <Dropdown
                            fluid
                            search 
                            name='profile'
                            onChange={this.profileHandleChange}
                            options={profileOptions}
                            selection
                            placeholder='Escolha o tipo de usuario'
                        />
                    </Form.Field>
                    <Form.Field width={4}>
                        <Dropdown
                            fluid
                            search 
                            allowAdditions
                            name='classroom'
                            key={classes.toString()}
                            onChange={this.classHandleChange}
                            options={classes}
                            placeholder='Escolha a turma do aluno'
                            selection
                            disabled={this.state.select2}
                            
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Field width={8}>
                        <Dropdown
                            fluid
                            search 
                            allowAdditions
                            key={usersOptions.toString()}
                            name='user'
                            onChange={this.handleChange}
                            options={usersOptions}
                            placeholder='Escolha o nome'
                            selection
                            disabled={this.state.select3}
                            onMouseDown={() =>  this.userOptions()}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            type='password'
                            name='password'
                            icon='lock'
                            placeholder='Digite a senha'
                            disabled={this.state.select3}
                            onChange={this.handleChange}
                            value={password}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Button positive onClick={() => this.save()}> Cadastrar </Button>
                    </Form.Field>
                </Form.Group>
            </Form>
        </React.Fragment>

            
        )
    }

}