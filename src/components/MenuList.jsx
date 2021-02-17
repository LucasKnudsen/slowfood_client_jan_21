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
  render() {
    const { products } = this.state
    let productList = products.map((product) => {
      return (
        <Item cy-data={`product_id_${product.id}`} key={product.id}>
          <Item.Content >
            <Item.Header cy-data={`product_title`} >{product.title}</Item.Header>
            <Item.Description cy-data={`product_description`} >{product.description}</Item.Description>
            <Item.Extra cy-data={`product_price`} >{product.price}kr</Item.Extra>
            {this.props.authenticated &&
              <Button circular size="mini" animated="fade" data-cy="order-button">
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
