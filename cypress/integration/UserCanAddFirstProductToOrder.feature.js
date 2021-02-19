describe('User can create order and add product to it', () => {
  describe('Successfully', () => {
    beforeEach(() => {
      cy.server()
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/orders",
        response: 'fixture:create_order.json',
        headers: {
          uid: 'user@email.com'
        }
      })
      cy.visit('/menu')
    })

    it('Displays success message when product is added to order', () => {
      cy.get('data.cy=["add-to-order"]').should('contain', 'Tenderloins was added to your order')
    })

    it('')

  })

})