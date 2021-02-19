import React from 'react';
import axios from 'axios'
import { Item, Button, Icon } from 'semantic-ui-react'

class MenuList extends React.Component {
  state = {
    products: []
  }

  componentDidMount() {
    this.getAllProducts()
  }

  getAllProducts = async () => {
    let response = await axios.get('/products')
    this.setState({ products: response.data.products })
  }

addToOrder = async (productId) => {
  let authHeader = localStorage.getItem("credentials")
  let response = await axios.post('/orders',{product_id: productId},{headers: authHeader})
}


  render() {
    const { products } = this.state
    const { authenticated } = this.props
    let productList = products.map((product) => {
      return (
        <Item cy-data={`product-id-${product.id}`} key={product.id}>
          <Item.Content >
            <Item.Header cy-data={`product-title`} >{product.title}</Item.Header>
            <Item.Description cy-data={`product-description`} >{product.description}</Item.Description>
            <Item.Extra cy-data={`product-price`} >{product.price}kr</Item.Extra>
            {authenticated &&
              <Button onClick={()=>{this.addToOrder(product.id)}} circular size="mini" animated="fade" data-cy="order-button">
                <Button.Content visible>Add to order!</Button.Content>
                <Button.Content hidden>
                  <Icon name="plus square outline" />
                </Button.Content>
              </Button>
            }
          </Item.Content>
        </Item>
      )
    })

    return (
      <>
        {productList}
      </>
    )
  }
}

export default MenuList
