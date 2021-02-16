describe('Will display list of all products', () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/products",
      response: 'fixture:allProducts.json',
    })
    cy.visit('/')
    
  })

  it('displays expected information inside product div', () => {
    cy.get('[cy-data="product_id_1"]').within(() => {
      cy.get('[cy-data="product_title_1"]').should('contain', 'Tenderloins')
      cy.get('[cy-data="product_description_1"]').should('contain', 'Our finest beef')
      cy.get('[cy-data="product_price_1"]').should('contain', '199')
    })
  })
})