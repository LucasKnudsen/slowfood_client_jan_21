import React, { Component } from 'react'
import { Form, Input, Button } from 'semantic-ui-react'


class Registration extends Component {
  render() {
    return (
      <Form data-cy='registration-form'>
        <Form.Group>
          <Form.Field
            data-cy='email-field'
            control={Input}
            label='email'
            placeholder='email'
          />
          <Form.Field
            data-cy='password-field'
            control={Input}
            label='password'
            placeholder='password'
          />
          <Form.Field
            data-cy='password-confirmation-field'
            control={Input}
            label='confirm password'
            placeholder='retype password'
          />
          <Form.Field data-cy='submit' control={Button}>Register!</Form.Field>
        </Form.Group>
      </Form>
    )
  }
}
export default Registration;