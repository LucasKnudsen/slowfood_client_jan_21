import React from 'react';
import axios from 'axios'
import { Item, Divider } from 'semantic-ui-react'

class MenuList extends React.Component {
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
    let productList = products.map((product) => {
      return (
        <>
          <Divider hidden />
          <Item>
            <Item.Content key={product.id} cy-data={`product_id_${product.id}`}>
              <Item.Header cy-data={`product_title_${product.id}`} >{product.title}</Item.Header>
              <Item.Description cy-data={`product_description_${product.id}`} >{product.description}</Item.Description>
              <Item.Extra cy-data={`product_price_${product.id}`} >{product.price}kr</Item.Extra>
            </Item.Content>
          </Item>
        </>
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
