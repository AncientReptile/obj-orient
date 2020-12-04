import {Navbar, Nav, Button} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react'
import App from '../App'
import '../App.css'

export class AppointmentNavbar extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            redirectHome: false
        }

        this.onClick = this.onClick.bind(this)
    }

    onClick = event => {
        if(event.target.name == "LogoutButton")
        {
            const data = {
                login: false
            } 

            this.props.onAccountChanged(data)
            this.setState({redirectHome: true})
        }
    }

    render() {
        // var test = JSON.parse(this.props.data)
        // console.log(test)

        var welcomeText = 'Welcome'
        if(this.props.loggedState == "true") {
            welcomeText += " " + this.props.username
        }
        welcomeText += "!"

        var loginButton;
        if(this.props.loggedState == "true") {
            loginButton = <Button name="LogoutButton" href="/"
                            variant="primary" onClick={this.onClick}>Log out</Button>
        } else {
            loginButton = <Button name="LoginButton" href="/login" 
                            variant="primary">Login</Button>
        }

        if(this.state.redirectHome) {
            return (<Redirect href='/'/>)
        }

        return (
            <Navbar className='navbar-top' bg='dark' variant='dark'>
                <Nav className='container-fluid'>
                    <Nav.Item>
                        <Navbar.Brand href="/">
                            Appointment System
                        </Navbar.Brand>
                    </Nav.Item>
                    <Nav.Item>
                        <Navbar.Brand>{welcomeText}</Navbar.Brand>
                        {loginButton}
                    </Nav.Item>
                </Nav>
            </Navbar>
        )
    }
}

export default AppointmentNavbar