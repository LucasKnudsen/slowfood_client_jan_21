import React from 'react';
import MenuList from '../components/MenuList'
import { Header, Grid, Item, Icon, Container } from 'semantic-ui-react'
import Registration from '../components/Registration'

class Menu extends React.Component {
  state = {
    authenticated: false
  }
  setAuthentication = () => {
    this.setState({ authenticated: true })
  }
  render() {
    return (
      <Container className="page-container" fluid>
        <Grid textAlign="center" divided="vertically" >
          <Header as="h1" className="header">
            <Icon name="gulp" />
            <Header.Content>
              Spora Hrana
            <Header.Subheader>Menu List</Header.Subheader>
            </Header.Content>
          </Header>
          <Grid.Row>
            <Registration setAuthentication={() => this.setAuthentication()} />
          </Grid.Row>
          <Grid.Row>
            <Item.Group>
              <MenuList authenticated={this.state.authenticated} />
            </Item.Group>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Menu