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
    try {
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
      }
    }
    catch (error) {
      this.setState({ errorMessage: error.response.data.errors.full_messages.toString()})
    }
  }
  render() {
    const { renderForm, greeting, errorMessage } = this.state
    return (
      <div>
        {renderForm ? (
          <Form onSubmit={(event) => this.registerUser(event)} data-cy='registration-form'>
            <Form.Group>
              <Form.Field
                data-cy='email-field'
                name="email"
                control={Input}
                type="email"
                label='email'
                placeholder='email'
              />
              <Form.Field
                data-cy='password-field'
                name="password"
                control={Input}
                type="password"
                label='password'
                placeholder='password'
              />
              <Form.Field
                data-cy='password-confirmation-field'
                name="password_confirmation"
                control={Input}
                type="password"
                label='confirm password'
                placeholder='retype password'
              />
              <Button data-cy='submit' type='submit'>Register!</Button>
            </Form.Group>
            {errorMessage &&
              <p data-cy="error-message">{errorMessage}</p>
            }
          </Form>
        ) : (
            <h4>{greeting}</h4>
          )
        }
      </div>
    )
  }
}
export default Registration;