import '../App.css';
import {Link, Redirect} from 'react-router-dom'
import React, { Component } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import apiURL from '../util/path.js'

export class Login extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            redirect: false,
            usernameBox: "",
            passwordBox: ""
        }

        this.handleChange = this.handleChange.bind(this)
        this.onClickLogin = this.onClickLogin.bind(this)

    }

    handleChange = event => {
        var value = event.target.value
        this.setState({[event.target.name]: value})
    }

    onClickLogin = event => {
        

        // if this.state.register is false, then login endpoint
        // if true, then create user endpoint

        var data = {
            "username": this.state.usernameBox,
            "password": this.state.passwordBox
        }

        axios.post(apiURL + "login", data)
        .then(res => {
            console.log(res)
            if(res.status == 201){
                console.log("Error")

                this.setState({
                    usernameBox: "",
                    passwordBox: "",
                })
            } else {
                const localData = {
                login: true,
                username: this.state.usernameBox,
                password: this.state.passwordBox,
                permissionLevel: "Admin"
                }

                this.props.onAccountChanged(localData);

                this.setState({
                    usernameBox: "",
                    passwordBox: "",
                    redirect: true
                })
            }
        })

        
    }

    render() {
    var title = "Login"
    var loginButton = "Login"
    title = "Login"
    loginButton = "Login"

    if(this.state.redirect)
        return <Redirect to="/"/>

    return (
        <div className="create-appoint-section border border-dark">
            <h1>{title}</h1>
            <br/>
            <Form>
                <Form.Group as={Row}>
                    <Col>
                        <Form.Label column >Username:</Form.Label>
                        <Form.Control name="usernameBox" type="text" 
                            value={this.state.usernameBox} 
                            onChange={this.handleChange}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col>
                        <Form.Label column >Password:</Form.Label>
                        <Form.Control name="passwordBox" type="text" 
                            value={this.state.passwordBox} 
                            onChange={this.handleChange}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col>
                        <Button name="LoginButton" onClick={this.onClickLogin}>{loginButton}</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
        );
    }
}

export default Login