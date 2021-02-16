import React from 'react';
import axios from 'axios'

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
    const {products} = this.state
    let productList = products.map((product) => {
      return ( 
        <div key={product.id}>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <small>{product.price}kr</small>
        </div>
      )
    })

    return (
      <>
        <h1 className="header">Slowfood</h1>
        {productList}
      </>
    );
  }
}

export default App;
