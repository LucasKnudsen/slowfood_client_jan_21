describe('User can finalize order', () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/products?category=mains",
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
    cy.visit('/menu')
    cy.get('[data-cy="register-button"]').click()
    cy.get('[data-cy="registration-form"]').within(() => {
      cy.get('[data-cy="email-field"]').type('user@email.com')
      cy.get('[data-cy="password-field"]').type('password')
      cy.get('[data-cy="password-confirmation-field"]').type('password')
      cy.get('[data-cy="submit"]').click()
    })
  })
  describe('Successfully', () => {
    beforeEach(() => {
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/orders",
        response: 'fixture:create_order.json',
        status: 201
      })
      cy.route({
        method: "PUT",
        url: "http://localhost:3000/api/orders/*",
        response: 'fixture:update_order.json',
      })
      cy.get('[cy-data="product-id-1"]').within(() => {
        cy.get('[data-cy="order-button"]').click()
      })
      cy.get('[cy-data="product-id-2"]').within(() => {
        cy.get('[data-cy="order-button"]').click()
      })
      cy.route({
        method: "PUT",
        url: "http://localhost:3000/api/orders/*",
        response: 'fixture:finalize_order.json',
      })
      cy.get('[data-cy="confirm-button"]').click()
    })

    it('displays confirmed order message', () => {
      cy.get('#order-message').should('contain', 'Your order is confirmed and will be available sort of soon!')
    })

    it('sets currentOrder state to null', () => {
      cy.get('[data-cy="view-order-button"]').should('not.be.visible')
      cy.get('#order-length').should('not.be.visible')
    })
  })

  describe('unsuccessfully', () => {
    it('does not display confirm button if there is no order made', () => {
      cy.get('[data-cy="confirm-button"]').should('not.exist')
    })
  })
})