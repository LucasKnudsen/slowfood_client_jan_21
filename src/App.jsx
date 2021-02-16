import React from 'react';
import axios from 'axios';
import MenuList from './components/MenuList'

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

    return (
      <>
        <h1 className="header">Slowfood</h1>
        <MenuList products={products}/>
      </>
    );
  }
}

export default App;
