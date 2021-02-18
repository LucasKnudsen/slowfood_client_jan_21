describe('Add to order button', () => {
  describe('is visible for authenticated users', () => {
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
      cy.visit('/menu')
    })

    it('displays a form to register', () => {
      cy.get('[data-cy="registration-form"]').within(() => {
        cy.get('[data-cy="email-field"]').type('user@email.com')
        cy.get('[data-cy="password-field"]').type('password')
        cy.get('[data-cy="password-confirmation-field"]').type('password')
        cy.get('[data-cy="submit"]').click()
      })
      cy.get('[cy-data="product_id_1"]').within(() => {
        cy.get('[data-cy="order-button"]').should('be.visible')
      })

    })

  })
  describe('button not visible if user is not authenticated', () => {
    beforeEach(() => {
      cy.server()
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/products",
        response: 'fixture:all_products.json',
      });
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/products",
        response: {
          errors: "Something went wrong! Please try again!",
          success: false
        },
        status: 401
      })
      cy.visit('/menu')
    })
    it('it is not visible', () => {
      cy.get('[cy-data="product_id_1"]').within(() => {
        cy.get('[data-cy="order-button"]').should('not.be.visible')
      })
    })
  })
})