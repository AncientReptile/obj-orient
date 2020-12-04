import '../App.css';
import {Redirect} from 'react-router-dom'
import React, { Component } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import apiURL from '../util/path'

class CreateAppoint extends React.Component{
  constructor(props){
    super(props)

    this.state = {
        redirectHome: false,
        showNewAppoint: false,
        newAppointID: null,
        newAppointLastName: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleOnClickSubmit = this.handleOnClickSubmit.bind(this)
    this.showNewAppoint = this.showNewAppoint.bind(this)
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleOnClickSubmit () {
    const data = {
      "subject" : this.state.subject,
      "notes": this.state.notes,
      "time": {
        start_time: this.state.startTime,
        end_time: this.state.endTime,
        date: this.state.date
      },
      "name": {
        "first_name": this.state.firstName,
        "last_name": this.state.lastName
      },
      "contact": {
        "phone_number": this.state.phoneNumber,
        "email": this.state.email
      }
    }

    axios.post(apiURL + "newappoint", data)
      .then(res => {
        console.log(res)
        if(res.status == 201){
          console.log("Error")
        } else {
          this.setState({
            newAppointID: res.data.id,
            newAppointLastName: res.data.lastName,
            showNewAppoint: true
          })
        }
      })
  }

  showNewAppoint() {
    if(this.state.showNewAppoint) {
      return(
        <div className="create-appoint-section border border-dark">
          <Form>
          <Form.Group as={Row}>
              <Form.Label column >Use the ID and your last name to search for the appointment later</Form.Label>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column >Appointment ID:</Form.Label>
              <Form.Label column>{this.state.newAppointID}</Form.Label>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label  column >Last Name:</Form.Label>
              <Form.Label column>{this.state.newAppointLastName}</Form.Label>
            </Form.Group>
          </Form>
        </div>
      )
    }
  }

  render() {
    if(this.state.redirectHome)
        return <Redirect to="/"/>

    return (
      <div>
        {this.showNewAppoint()}
        <div className="create-appoint-section border border-dark">
          <h1>Create Appointment</h1>
          <br/>
          <Form>
              <Form.Group as={Row}>
                  <Form.Label  inline column >Appointment Subject:</Form.Label>
                  <Col sm={10}>
                    <Form.Control name="subject" onChange={this.handleChange} inline type="text"></Form.Control>
                  </Col>
              </Form.Group>
              <Form.Group as={Row}>
                  <Form.Label  inline column >Appointment Notes:</Form.Label>
                  <Col sm={10}>
                    <Form.Control name="notes" onChange={this.handleChange} inline type="text"></Form.Control>
                  </Col>
              </Form.Group>
              <Form.Group as={Row} >
                  <Form.Group as={Col}>
                    <Form.Label >First name:</Form.Label>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Control name="firstName" onChange={this.handleChange} type="text"></Form.Control>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Last name:</Form.Label>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Control name="lastName" onChange={this.handleChange} type="text"></Form.Control>
                  </Form.Group>
              </Form.Group>
              <Form.Group as={Row} >
                  <Form.Group as={Col}>
                    <Form.Label >Email:</Form.Label>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Control name="email" onChange={this.handleChange} type="text"></Form.Control>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Phone Number:</Form.Label>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Control name="phoneNumber" onChange={this.handleChange} type="text"></Form.Control>
                  </Form.Group>
              </Form.Group>
              <Form.Group as={Row}>
                  <Form.Group as={Col}>
                    <Form.Label >Start time:</Form.Label>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Control name="startTime" onChange={this.handleChange} type="text"></Form.Control>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>End time:</Form.Label>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Control name="endTime" onChange={this.handleChange} type="text"></Form.Control>
                  </Form.Group>
              </Form.Group>
              <Form.Group as={Row}>
                  <Form.Group as={Col}>
                    <Form.Label >Date:</Form.Label>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Control name="date" onChange={this.handleChange} type="text"></Form.Control>
                  </Form.Group>
              </Form.Group>
              <Form.Group as={Row}>
                <Col>
                  <Button onClick={this.handleOnClickSubmit}>Create Appointment</Button>
                </Col>
              </Form.Group>
          </Form>
        </div>
      </div>
    );
  }
}


export default CreateAppoint;