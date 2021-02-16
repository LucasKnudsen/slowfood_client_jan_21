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

    return (
      <>
        <h1 className="header">Slowfood</h1>
      </>
    );
  }
}

export default App;
