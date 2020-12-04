import '../App.css';
import {Redirect} from 'react-router-dom'
import React, { Component } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import apiURL from '../util/path'

class SearchAppoint extends React.Component{
  constructor(props){
    super(props)

    this.state = {
        redirectHome: false,
        showAppoint: false,
        currAppoint: null,
        id: '',
        lastName: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleOnClickSearch = this.handleOnClickSearch.bind(this)
    this.showAppoint = this.showAppoint.bind(this)
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleOnClickSearch () {
    const data = {
      "_id": this.state.id,
      "lastName": this.state.lastName
    }
    console.log(this.state.id)
    console.log(data)

    axios.get(apiURL + "myappoint", {
        params: {
            "_id": this.state.id,
            "lastName": this.state.lastName
        }
    })
      .then(res => {
        console.log(res)
        if(res.status == 201){
          console.log("Error")
        } else {
            console.log(res.data[0].name.first_name)
          this.setState({
            currAppoint: res.data[0],
            showAppoint: true
          })
        }
      })
  }

  showAppoint() {
    if(this.state.showAppoint) {
        var date = new Date(this.state.currAppoint.time.date)
        var months = ["January", "February", "March", "April", "May", "June", "July", 
                        "August", "September", "October", "November", "December"];
        var dateString = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
        
      return(
        <div className="create-appoint-section border border-dark">
            <Form>
              <Form.Group as={Row}>
                  <Form.Label  inline column >Appointment Subject:</Form.Label>
                  <Col sm={10}>
                    <Form.Label inline>{this.state.currAppoint.subject}</Form.Label>
                  </Col>
              </Form.Group>
              <Form.Group as={Row}>
                  <Form.Label  column >Appointment Notes:</Form.Label>
                  <Col>
                    <Form.Label >{this.state.currAppoint.notes}</Form.Label>
                  </Col>
              </Form.Group>
              <Form.Group as={Row} >
                  <Form.Group as={Col}>
                    <Form.Label column >First name:</Form.Label>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label column>{this.state.currAppoint.name.first_name}</Form.Label>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label column>Last name:</Form.Label>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label column>{this.state.currAppoint.name.last_name}</Form.Label>
                  </Form.Group>
              </Form.Group>
              <Form.Group as={Row} >
                  <Form.Group as={Col}>
                    <Form.Label column>Email:</Form.Label>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label column>{this.state.currAppoint.contact.email}</Form.Label>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label column>Phone Number:</Form.Label>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label column>{this.state.currAppoint.contact.phone_number}</Form.Label>
                  </Form.Group>
              </Form.Group>
              <Form.Group as={Row}>
                  <Form.Group as={Col}>
                    <Form.Label column>Start time:</Form.Label>
                  </Form.Group>
                  <Form.Group as={Col}>
                     <Form.Label column>{this.state.currAppoint.time.time_start}</Form.Label>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label column>End time:</Form.Label>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label column>{this.state.currAppoint.time.time_end}</Form.Label>
                  </Form.Group>
              </Form.Group>
              <Form.Group as={Row}>
                  <Form.Group as={Col}>
                    <Form.Label column>Date:</Form.Label>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label column>{dateString}</Form.Label>
                  </Form.Group>
              </Form.Group>
          </Form>
        </div>
      )
    }
  }

  render() {
    if(this.state.redirectHome){
        return <Redirect to="/"/>
    }

    return (
      <div>
        <div className="create-appoint-section border border-dark">
          <h1>Search Appointment</h1>
          <br/>
          <Form>
              <Form.Group as={Row}>
                  <Form.Label column >Appointment ID:</Form.Label>
                  <Col>
                    <Form.Control name="id" onChange={this.handleChange} type="text"></Form.Control>
                  </Col>
              </Form.Group>
              <Form.Group as={Row} >
                  <Form.Group as={Col}>
                    <Form.Label>Last name:</Form.Label>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Control name="lastName" onChange={this.handleChange} type="text"></Form.Control>
                  </Form.Group>
              </Form.Group>
              <Form.Group as={Row}>
                <Col>
                  <Button onClick={this.handleOnClickSearch}>Search</Button>
                </Col>
              </Form.Group>
          </Form>
        </div>
        {this.showAppoint()}
      </div>
    );
  }
}


export default SearchAppoint;