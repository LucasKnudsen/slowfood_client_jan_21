describe('User can create order and add product to it', () => {
  describe('Successfully', () => {
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
    })

    it('Displays success message when product is added to order', () => {
      cy.get('#order-message').should('contain', 'Tenderloins was added to your order')
    })

    it('Displays correct amount of items in the order', () => {
      cy.get('#order-length').should('contain', 'You have 1 item in your order')
    })
  })
})