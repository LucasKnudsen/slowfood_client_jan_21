import React from 'react'
import { Menu, Icon, Sidebar } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom"

const Header = () => {
  return (
      <Sidebar
        as={Menu}
        animation='push'
        icon='labeled'
        inverted
        vertical
        visible={true}
        width='thin'
      color="brown"
      size="massive"
      >
        <Menu.Item
          id="home"
          name="Slowfood"
          as={Link}
          to={{ pathname: "/" }}

        >
          <Icon name="home" />
          Home
        </Menu.Item>
        <Menu.Item
          id="menu-tab"
          name="menu"
          as={NavLink}
          to={{ pathname: "/menu" }}
        >
          <Icon name="food" />
          Menu
        </Menu.Item>
        <Menu.Item
          id="contact-tab"
          name="contact"
          as={NavLink}
          to={{ pathname: "/contact" }}
        >
          <Icon name="call" />
          Contact Us
        </Menu.Item>
      </Sidebar>
  )
}

export default Header