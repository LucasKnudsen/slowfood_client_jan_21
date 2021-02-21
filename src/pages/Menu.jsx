import React from 'react';
import MenuList from '../components/MenuList'
import { Header, Grid, Item, Icon, Container } from 'semantic-ui-react'
import Registration from '../components/Registration';
import RegisterModal from '../components/RegisterModal'
import axios from 'axios';
import ItemList from '../components/ItemList'

class Menu extends React.Component {
  state = {
    authenticated: false
  }
  setAuthentication = () => {
    this.setState({ authenticated: true })
  }

  addToOrder = async (product) => {
    let authHeader = JSON.parse(localStorage.getItem("credentials"))
    if (!this.state.currentOrder) {
      try {
        let response = await axios.post(
          "/orders",
          { product_id: product.id },
          { headers: authHeader })
        this.setState({
          currentOrder: response.data.order,
          orderMessage: `${product.title} was added to your order`
        })
      }
      catch (error) {
        this.setState({ orderMessage: "Product couldn't be added to your order. Try again later" })
      }
    } else {
      try {
        let response = await axios.put(
          `/orders/${this.state.currentOrder.id}`,
          { product_id: product.id, order_id: this.state.currentOrder.id },
          { headers: authHeader })
        this.setState({
          currentOrder: response.data.order,
          orderMessage: `${product.title} was added to your order`
        })
      } catch (error) {
        this.setState({ orderMessage: "Product couldn't be added to your order. Try again later" })
      }
    }
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
          <Grid.Row textAlign="center">
            <RegisterModal setAuthentication={() => this.setAuthentication()} />
            <Registration setAuthentication={() => this.setAuthentication()} />
          </Grid.Row>
          {this.state.orderMessage && (
            <div >
              <p id="order-message">{this.state.orderMessage}</p>

              <p id="order-length">You have {this.state.currentOrder.items.length} {this.state.currentOrder.items.length > 1 ? "items" : "item"} in your order</p>
              <ItemList orderList={this.state.currentOrder.items} />
            </div>
          )}
          <Grid.Row>
            <Item.Group>
              <MenuList addToOrder={this.addToOrder} authenticated={this.state.authenticated} />
            </Item.Group>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Menu