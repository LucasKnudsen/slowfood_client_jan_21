import React from 'react'
import { Container, Grid, Header, Icon } from 'semantic-ui-react'

const Contact = () => {
  return (
    <Container className="page-container" fluid>
      <Grid textAlign="center" divided="vertically" >
        <Header as="h1" className="header">
          <Icon name="gulp" />
          <Header.Content>
            Spora Hrana
            <Header.Subheader>Ready to order?</Header.Subheader>
          </Header.Content>
        </Header>
      </Grid>
    </Container>
  )
}

export default Contact
