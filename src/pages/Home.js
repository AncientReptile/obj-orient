import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'

import '../App.css';
import { Link, Redirect } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import axios from 'axios'
import apiURL from '../util/path'

class Home extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            redirectCreate: false,
            redirectSearch: false,
            searchType: "Daily",
            permissionLevel: localStorage.getItem('permissionLevel')
        }
        console.log(this.state.permissionLevel)

        this.handleClickCreate = this.handleClickCreate.bind(this)
        this.handleClickSearch = this.handleClickSearch.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.adminRender = this.adminRender.bind(this)
        this.getAppoint = this.getAppoint.bind(this)
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleClickCreate() {
        this.setState(
            {redirectCreate: true}
        )
    }

    handleClickSearch() {
        this.setState(
            {redirectSearch: true}
        )
    }

    getAppoint() {
        axios.get(apiURL + "getallappoint", {
            params: {
                "type": this.state.searchType
            }
        })
          .then(res => {
            console.log(res)
            if(res.status == 201){
              console.log("Error")
            } else {
                // console.log(res.data[0].name.first_name)
            //   this.setState({
            //     currAppoint: res.data[0],
            //     showAppoint: true
            //   })
            
            }
        })
    }

    adminRender() {
        if(this.state.permissionLevel == "Admin"){
            return (
                <Row>
                    <Form className="col-lg-1 col-centered">
                        <Form.Group>
                            <Form.Control name="searchType" onChange={this.handleChange} as="select" size="sm" defaultValue="Daily">
                                <option>Daily</option>
                                <option>Weekly</option>
                                <option>Monthly</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Button onClick={this.getAppoint}>Get Appointments</Button>
                        </Form.Group>
                    </Form>
                </Row>
            )
        }

        return (null)
    }

    render() {
        if(this.state.redirectCreate)
        {
            return <Redirect to='/createappoint'/>
        } else if(this.state.redirectSearch){
            return <Redirect to='/searchappoint'/>
        }

        console.log(new Date("12/1/2020"))
        return (
            <div>
                <h1>Home</h1>
                <br/>
                <Row className="col-lg-1 col-centered">
                    <Button onClick={this.handleClickCreate}>Create Appointment</Button>
                </Row>
                <br/>
                <Row className="col-lg-1 col-centered">
                    <Button onClick={this.handleClickSearch}>Search Appointment</Button>
                </Row>
                <br/>
                {this.adminRender()}
            </div>
        );
    }
}

export default Home;
