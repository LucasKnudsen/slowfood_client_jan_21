describe('User can create order and add product to it', () => {
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
        headers: {
          uid: 'user@email.com'
        }
      })
      cy.visit('/menu')
      cy.get('[data-cy="registration-form"]').within(() => {
        cy.get('[data-cy="email-field"]').type('user@email.com')
        cy.get('[data-cy="password-field"]').type('password')
        cy.get('[data-cy="password-confirmation-field"]').type('password')
        cy.get('[data-cy="submit"]').click()
      })
    })

    it('Displays success message when product is added to order', () => {
      cy.get('[cy-data="product-id-1"]').within(() => {
        cy.get('[data-cy="order-button"]').click()
      })
      cy.get('data.cy=["add-to-order"]').should('contain', 'Tenderloins was added to your order')
    })

    it('')

  })

})