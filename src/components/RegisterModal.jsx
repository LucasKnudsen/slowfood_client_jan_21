import React from 'react'
import { Button, Container, Modal, Form, Grid, Header, Message, Segment, Input } from 'semantic-ui-react'
import axios from 'axios'

class RegisterButton extends React.Component {
  state = {
    open: false,
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
        this.setState({
          renderForm: false,
          greeting: `Welcome ${response.data.data.email}! Bon Appétit `,
          open: false
        })
      }
    }
    catch (error) {
      error.response ? (
        this.setState({ errorMessage: error.response.data.errors.full_messages.toString() }))
        : this.setState({ errorMessage: "Couldn't connect to the server! Please try again later!" })
    }
  }
  render() {
    const { renderForm, greeting, errorMessage, open } = this.state
    return (
      <Container textAlign="center">
        {renderForm && <h5>Register or sign in to order</h5>}
        {!renderForm ?
          <h4>{greeting}</h4>
          :
          <Modal
            onClose={() => this.setState({ open: false })}
            onOpen={() => this.setState({ open: true })}
            open={open}
            trigger={<Button color="brown" data-cy="register-button">Register/Sign In</Button>}
          >
            <Grid className="login-modal" textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='brown' textAlign='center'>
                  Register to make an order!
            </Header>
                {errorMessage &&
                  <p data-cy="error-message">{errorMessage}</p>
                }
                <Form onSubmit={(event) => this.registerUser(event)} data-cy='registration-form' size='large'>
                  <Segment stacked>
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
                    <Button data-cy='submit' color="brown" type='submit'>Register!</Button>
                  </Segment>
                </Form>
                <Message>
                  Already have an account? <a href='/menu'>Sign In</a>
                </Message>
              </Grid.Column>
            </Grid>
          </Modal>}
      </Container>
    )
  }
}

export default RegisterButton
