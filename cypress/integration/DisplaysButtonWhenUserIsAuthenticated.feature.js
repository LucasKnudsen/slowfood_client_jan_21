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
        response: "fixture:register_user.json"
      });
      cy.visit('/')

    })

    it('displays a form to register', () => {
      cy.get('[cy-data="registration-form"]').within(() => {
        cy.get('[cy-data="email-field"]').type('user@email.com')
        cy.get('[cy-data="password-field"]').type('password')
        cy.get('[cy-data="password-confirmation-field"]').type('password')
        cy.get('[cy-data="submit"]').click()
      })
    })

  })
})