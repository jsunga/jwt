import React, { Component } from 'react'
import axios from 'axios'
import jwt from 'jsonwebtoken'

export default class App extends Component {

  state = {
    username: ''
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      jwt.verify(localStorage.getItem('token'), 'secretkey', (err, authData) => {
        this.setState({
          username: authData.user.username
        })
      })
    }
  }

  button = _ => {
    axios.post('/api/login')
    .then(res => {
      localStorage.setItem('token', res.data.token)
    })
  }

  post = _ => {
    console.log(`Bearer ${localStorage.getItem('token')}`)
    axios.post('/api/posts', {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => {
      console.log(res.data.authData.user.username)
    })
  }

  render() {
    return (
      <div>
          <h1>{this.state.username}</h1>
          <button onClick={this.button}>Log In</button>
          <button onClick={this.post}>Post</button>
      </div>
    )
  }
}

