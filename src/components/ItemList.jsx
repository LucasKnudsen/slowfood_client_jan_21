import React from 'react';
import { Item, Button, Modal, Icon, Header } from 'semantic-ui-react'


const ItemList = ({ orderList }) => {
  const [open, setOpen] = React.useState(false)
  let totalPrice = 0

  const orderItems = orderList.map((item) => {
    totalPrice += item.price
    debugger
    return (
      <Item className="centering-items">
        <Item.Content >
          <Item.Header>{item.title}</Item.Header>
          <Item.Meta>{item.price}kr</Item.Meta>
        </Item.Content>
      </Item>
    )
  })
  return (
    <Modal
      centered
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
      trigger={<Button>View Your Order</Button>}
    >
      <Header icon>
        <Icon size="small" name='food' />
        Your Order
      </Header>
      <Item.Group>
        {orderItems}
      </Item.Group>
      <Modal.Content>
        <p>
          Total price: {totalPrice}kr
        </p>
      </Modal.Content>

    </Modal>

  )
}

export default ItemList
