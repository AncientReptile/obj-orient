import Button from 'react-bootstrap/Button'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {AppointmentNavbar} from './components/navbar.js'
import React from 'react'

import Home from './pages/Home'
import CreateAppoint from './pages/CreateAppoint'
import SearchAppoint from './pages/SearchAppoint'
import Login from './pages/Login'
import './App.css';

<<<<<<< Updated upstream
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
=======
export class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: localStorage.getItem('login'),
      username: localStorage.getItem('username'),
      permissionLevel: localStorage.getItem('permissionLevel')
    }

    this.accountChange = this.accountChange.bind(this)
    this.onAppointCreated = this.onAppointCreated.bind(this)
  }

  accountChange(dataIn) {
    if(dataIn.login == true || localStorage.getItem('login') == true) {
      localStorage.setItem('login', true)
      localStorage.setItem('username', dataIn.username)
      localStorage.setItem('permissionLevel', dataIn.permissionLevel)

    } else {
      localStorage.setItem('login', false)
      localStorage.removeItem('username')
      localStorage.removeItem('permissionLevel')
    }

    this.setState({loggedIn: localStorage.getItem('login')})
    this.setState({username: localStorage.getItem('username')})
    this.setState({permissionLevel: localStorage.getItem('permissionLevel')})
  }

  onAppointCreated(dataIn) {
    this.setState({
      events: [...this.state.events, dataIn]
    })
  }

  render() {

    console.log(this.state.events)
    return (
      <Router>
        <div className="App">
            <AppointmentNavbar loggedState={this.state.loggedIn} username={this.state.username} onAccountChanged={this.accountChange}/>
            <Switch>
              <Route exact path="/">
                <Home 
                  events={this.state.events} loggedState={this.state.loggedIn} permissionLevel={this.state.permissionLevel}
                  username={this.state.username}/>
              </Route>
              <Route path="/createappoint">
                <CreateAppoint 
                  username={this.state.username} permissionLevel={this.state.permissionLevel}
                  onAppointCreated={this.onAppointCreated}
                />
              </Route>
              <Route path="/login">
                <Login loggedState={this.state.loggedIn} onAccountChanged={this.accountChange}/>
              </Route>
              <Route path="/searchappoint">
                <SearchAppoint/>
              </Route>
            </Switch>
        </div>
      </Router>
    );
  }
>>>>>>> Stashed changes
}

export default App;