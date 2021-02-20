import React from 'react';
import { Item } from 'semantic-ui-react'


const ItemList = ({ orderList }) => {

const orderItems = orderList.map((item) => {
  return (
 <Item>
   <Item.Content>
     <Item.Header>{item.title}</Item.Header>
     <Item.Meta>{item.price}kr</Item.Meta>
   </Item.Content>
 </Item>   
  )
})
  return (
    <Item.Group>
      {orderItems}
    </Item.Group>
  )
}

export default ItemList
