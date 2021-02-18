import React from 'react'
import { Container, Grid, Header, Icon } from 'semantic-ui-react'

const Home = () => {
  return (
    <Container className="page-container" fluid>
      <Grid textAlign="center" divided="vertically" >
        <Header as="h1" className="header">
          <Icon name="gulp" />
          <Header.Content>
            Spora Hrana
            <Header.Subheader>Slow Food - Served Fast</Header.Subheader>
          </Header.Content>
        </Header>
        <Grid.Row columns={1} verticalAlign="middle">
          <Grid.Column>
            <h1 style={{fontStyle: "italic", padding: "100px 150px 10px 150px"}}>
              Because only slow food can teach us the things that really matter - care, beauty, concentration, discernment, sensuality, all the best that humans are capable of, but only if we take the time to think about what we're eating.
          </h1>
            <quote>Alice Waters</quote>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default Home
