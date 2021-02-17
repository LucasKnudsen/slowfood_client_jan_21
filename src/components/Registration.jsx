import React, { Component } from 'react'
import { Form, Input, Button } from 'semantic-ui-react'
import axios from 'axios'


class Registration extends Component {
  state = {
    renderForm: true
  }


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

    if (response.data.data.email) {
      this.props.setAuthentication()
      this.setState({ renderForm: false })
      this.setState({ greeting: `Bon Appétit ${response.data.data.email}!` })
    } else {
      this.setState({ errorMessage: response })
    }
  }

  render() {
    return (
      <div>
        {this.state.renderForm ? (
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
            {this.state.errorMessage && <p>{this.state.errorMessage}</p>}
          </Form>
        ) : (
            <h4>{this.state.greeting}</h4>
          ) 
        }
      </div>
    )
  }
}
export default Registration;