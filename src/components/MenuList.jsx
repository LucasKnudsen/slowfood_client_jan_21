import React from 'react'

const MenuList = ({ products }) => {
  
  let productList = products.map((product) => {
    return ( 
      <div key={product.id} cy-data={`product_id_${product.id}`}>
        <h2 cy-data={`product_title_${product.id}`} >{product.title}</h2>
        <p cy-data={`product_description_${product.id}`} >{product.description}</p>
        <small cy-data={`product_price_${product.id}`} >{product.price}kr</small>
      </div>
    )
  })
  
  return (
    <>
      {productList}
    </>
  )
}

export default MenuList
