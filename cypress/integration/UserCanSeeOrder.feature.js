import { Item } from "semantic-ui-react";

describe('User can see the entire order', () => {
  describe('Successfully', () => {
    beforeEach(() => {
      cy.server()
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/products",
        response: 'fixture:all_products.json',
      });
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/auth",
        response: "fixture:register_user.json",
        headers: {
          uid: 'user@email.com'
        }
      });
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/orders",
        response: 'fixture:create_order.json',
        status: 201
      })
      cy.visit('/menu')
      cy.get('[data-cy="register-button"]').click()
      cy.get('[data-cy="registration-form"]').within(() => {
        cy.get('[data-cy="email-field"]').type('user@email.com')
        cy.get('[data-cy="password-field"]').type('password')
        cy.get('[data-cy="password-confirmation-field"]').type('password')
        cy.get('[data-cy="submit"]').click()
      })
      cy.get('[cy-data="product-id-1"]').within(() => {
        cy.get('[data-cy="order-button"]').click()
      })
      cy.get('[data-cy="view-order-button"]').click();
    })
    it('Displays the orderlist', () =>{
      cy.get('[data-cy="order-modal"]').should('be.visible')
    })
    it('Displays the items in the order', () => {
      cy.get('[data-cy="item-id-1"]').within(() => {
        cy.get(".header").should('contain', "Tenderloins")
        cy.get(".meta").should('contain', "199kr")
      })
    })
    it('Displays the totalprice', () => {
      cy.get('[data-cy="total-price"]').should('contain','Total price: 199kr')
    })
  })
})