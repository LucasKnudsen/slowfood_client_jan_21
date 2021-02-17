import React, { Component } from 'react'
import { Form, Input, Button } from 'semantic-ui-react'
import axios from 'axios'


class Registration extends Component {
  
  registerUser = async (event) => {
    event.preventDefault()

    let credentials = {
      email: event.target.email.value,
      password: event.target.password.value,
      password_confirmation: event.target.password_confirmation.value
    }
    let response = await axios.post('/auth', credentials)
    const userCredentials = {
      uid: response.headers['uid'],
      access_token: response.headers['access-token'],
      client: response.headers['client'],
      expiry: response.headers['expiry'],
      token_type: 'Bearer'
    }
    localStorage.setItem('credentials', JSON.stringify(userCredentials));
    this.props.setAuthentication()
    

  }
  
  render() {
    return (
      <Form onSubmit={(event) => this.registerUser(event)} data-cy='registration-form'>
        <Form.Group>
          <Form.Field
            data-cy='email-field'
            name="email"
            control={Input}
            label='email'
            placeholder='email'
          />
          <Form.Field
            data-cy='password-field'
            name="password"
            control={Input}
            label='password'
            placeholder='password'
          />
          <Form.Field
            data-cy='password-confirmation-field'
            name="password_confirmation"
            control={Input}
            label='confirm password'
            placeholder='retype password'
          />
          <Button data-cy='submit' type='submit'>Register!</Button>
        </Form.Group>
      </Form>
    )
  }
}
export default Registration;