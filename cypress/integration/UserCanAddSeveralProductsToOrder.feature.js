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
        status: 201
      })
      cy.visit('/menu')
      cy.get('[data-cy="registration-form"]').within(() => {
        cy.get('[data-cy="email-field"]').type('user@email.com')
        cy.get('[data-cy="password-field"]').type('password')
        cy.get('[data-cy="password-confirmation-field"]').type('password')
        cy.get('[data-cy="submit"]').click()
      })
      cy.get('[cy-data="product-id-1"]').within(() => {
        cy.get('[data-cy="order-button"]').click()
      })
      cy.route({
        method: "PUT",
        url: "http://localhost:3000/api/orders/*",
        response: 'fixture:update_order.json',
      })
      cy.get('[cy-data="product-id-2"]').within(() => {
        cy.get('[data-cy="order-button"]').click()
      })
    })

    it('Displays success message when product is added to order', () => {
      cy.get('#order-message').should('contain', 'Kebab was added to your order')
    })

    it('Displays correct amount of items in the order', () => {
      cy.get('#order-length').should('contain', 'You have 2 items in your order')
    })

    it('Updates the list of orders', () => {
      cy.get('[data-cy="view-order-button"]').click();
      cy.get('[data-cy="item-id-2"]').within(() => {
        cy.get(".header").should('contain', "Kebab")
        cy.get(".meta").should('contain', "39kr")
      })
      cy.get('[data-cy="total-price"]').should('contain','Total price: 238kr')
    })

  })
})