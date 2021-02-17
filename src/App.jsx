import React from 'react';
import './app.css'
import MenuList from './components/MenuList'
import { Header, Grid, Item, Icon } from 'semantic-ui-react'
import Registration from './components/Registration'

class App extends React.Component {
  state = {
    authenticated: false
  }
  setAuthentication = () => {
    this.setState({ authenticated: true })
  }
  render() {
    return (
      <Grid textAlign="center" divided="vertically" >
        <Header as="h1" className="header">
          <Icon name="gulp" />
          <Header.Content>
            Slowfood
            <Header.Subheader>Menu List</Header.Subheader>
          </Header.Content>
        </Header>
        <Grid.Row>
          <Registration setAuthentication={() => this.setAuthentication()} />
        </Grid.Row>
        <Grid.Row>
          <Item.Group>
            <MenuList authenticated={this.state.authenticated}/>
          </Item.Group>
        </Grid.Row>
      </Grid>
    );
  }
}

export default App;
