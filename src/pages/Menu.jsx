import React from 'react';
import MenuList from '../components/MenuList'
import { Header, Grid, Item, Icon, Container } from 'semantic-ui-react'
import Registration from '../components/Registration';
import axios from 'axios'

class Menu extends React.Component {
  state = {
    authenticated: false
  }
  setAuthentication = () => {
    this.setState({ authenticated: true })
  }

  addToOrder = async (product) => {
    let authHeader = localStorage.getItem("credentials")
    debugger
    let response = await axios.post('/orders', { product_id: product.id }, { headers: authHeader })

   // this.setState({order: response.data.data.order.items})
    this.setState({ orderMessage: `${product.title} was added to your order` })
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
            {this.state.orderMessage && <p data-cy="add-to-order">{this.state.orderMessage}</p>}
            <Item.Group>
              <MenuList addToOrder={()=> {this.addToOrder()}} authenticated={this.state.authenticated} />
            </Item.Group>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Menu