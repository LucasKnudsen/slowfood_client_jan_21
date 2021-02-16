import React from 'react';
import axios from 'axios';
import './app.css'
import MenuList from './MenuList'
import { Header, Grid, Item, Icon } from 'semantic-ui-react'

class App extends React.Component {
  state = {
    products: []
  }

  componentDidMount() {
    this.getAllProducts()
  }

  getAllProducts = async () => {
    let response = await axios.get('http://localhost:3000/api/products')
    this.setState({ products: response.data.products })
  }

  render() {
    const { products } = this.state

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
          <Item.Group>
            <MenuList products={products} />
          </Item.Group>
        </Grid.Row>
      </Grid>
    );
  }
}

export default App;
