describe('Will display list of all products', () => {
  describe('successfully', () => {
    beforeEach(() => {
      cy.server()
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/products",
        response: 'fixture:all_products.json',
      })
      cy.visit('/menu')

    })

    it('displays expected information inside product div', () => {
      cy.get('[cy-data="product-id-1"]').within(() => {
        cy.get('[cy-data="product-title"]').should('contain', 'Tenderloins')
        cy.get('[cy-data="product-description"]').should('contain', 'Our finest beef')
        cy.get('[cy-data="product-price"]').should('contain', '199')
      })
    })
  })
  describe('still loads if GET request fails', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.server()
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/products",
        response: { "products": [] }
      })

    })
    it('Bad GET request will not crash the site', () => {
      cy.get('.header').should('exist')
    })
  })

})
