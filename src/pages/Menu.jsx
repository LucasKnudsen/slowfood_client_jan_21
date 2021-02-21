import React from 'react';
import MenuList from '../components/MenuList'
import { Header, Grid, Icon, Container, Button } from 'semantic-ui-react'
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
          orderMessage: `${product.title} was added to your order`,
          currentOrder: response.data.order
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

  confirmOrder = async () => {
    let authHeader = JSON.parse(localStorage.getItem("credentials"))
    try {
      let response = await axios.put(
        `/orders/${this.state.currentOrder.id}`,
        { order_id: this.state.currentOrder.id, confirmed: true },
        { headers: authHeader })
      this.setState({
        currentOrder: undefined,
        orderMessage: response.data.message
      })
    }
    catch (error) {

    }
  }

  render() {
    const { orderMessage, currentOrder, authenticated } = this.state
    return (
      <Container className="page-container" fluid>
        <Grid textAlign="center" divided="vertically" >
          <Header as="h1" >
            <Icon name="gulp" />
            <Header.Content className="hero">
              Spora Hrana
            <Header.Subheader>Menu List</Header.Subheader>
            </Header.Content>
          </Header>
          <Grid.Row textAlign="center">
            <RegisterModal setAuthentication={() => this.setAuthentication()} />
            {/* <Registration setAuthentication={() => this.setAuthentication()} /> */}
          </Grid.Row>
          {orderMessage && (
            <div >
              <p id="order-message">{orderMessage}</p>
              {currentOrder && (
                <div>
                  <p id="order-length">You have {currentOrder.items.length} {currentOrder.items.length > 1 ? "items" : "item"} in your order</p>
                  <ItemList orderList={currentOrder.items} />
                  <Button data-cy="confirm-button" onClick={() => this.confirmOrder()} >Confirm order!</Button>
                </div>
              )}
            </div>
          )}
          <Grid.Row columns={3}>
            <Grid.Column>
              <h1>Starters</h1>
              <MenuList category="starters" addToOrder={this.addToOrder} authenticated={authenticated} />
            </Grid.Column>
            <Grid.Column>
            <h1>Mains</h1>
              <MenuList category="mains" addToOrder={this.addToOrder} authenticated={authenticated} />
            </Grid.Column>
            <Grid.Column>
            <h1>Desserts</h1>
              <MenuList category="desserts" addToOrder={this.addToOrder} authenticated={authenticated} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Menu