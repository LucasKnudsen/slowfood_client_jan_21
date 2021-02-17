import React from 'react';
import './app.css'
import MenuList from './components/MenuList'
import { Header, Grid, Item, Icon } from 'semantic-ui-react'
import Registration from './components/Registration'

class App extends React.Component {

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
          <Registration/>
        </Grid.Row>
        <Grid.Row>
          <Item.Group>
            <MenuList/>
          </Item.Group>
        </Grid.Row>
      </Grid>
    );
  }
}

export default App;
