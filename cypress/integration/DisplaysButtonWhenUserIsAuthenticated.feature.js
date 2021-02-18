describe('Add to order button', () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/products",
      response: 'fixture:all_products.json',
    });
  })
  describe('is visible for authenticated users', () => {
    beforeEach(() => {
      cy.server()
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/auth",
        response: "fixture:register_user.json",
        headers: {
          uid: 'user@email.com'
        }
      });
      cy.visit('/')
    })

    it('displays a form to register', () => {
      cy.get('[data-cy="registration-form"]').within(() => {
        cy.get('[data-cy="email-field"]').type('user@email.com')
        cy.get('[data-cy="password-field"]').type('password')
        cy.get('[data-cy="password-confirmation-field"]').type('password')
        cy.get('[data-cy="submit"]').click()
      })
      cy.get('[cy-data="product-id-1"]').within(() => {
        cy.get('[data-cy="order-button"]').should('be.visible')
      })
    })

  })
  describe('button not visible if user is not authenticated', () => {
    beforeEach(() => {
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/auth",
        response: {
          errors: {
            full_messages: ["Invalid login credentials. Please try again."],
          },
          success: false,
        },
        status: 401
      })
      cy.visit('/')
      cy.get('[data-cy="registration-form"]').within(() => {
        cy.get('[data-cy="email-field"]').type('user@email.com')
        cy.get('[data-cy="password-field"]').type('password')
        cy.get('[data-cy="password-confirmation-field"]').type('passworm')
        cy.get('[data-cy="submit"]').click()
      })
    })

    it('it is not visible', () => {
      cy.get('[cy-data="product-id-1"]').within(() => {
        cy.get('[data-cy="order-button"]').should('not.be.visible')
      })
    })

    it('displays error message', () => {
      cy.get('[data-cy="error-message"]').should('contain', "Invalid login credentials. Please try again.")
    })
  })
})