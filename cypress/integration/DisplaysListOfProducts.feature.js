describe('Will display list of all products', () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/products",
      response: 'fixture:product_data.json'
    })
  })

  it('displays expected information inside product div', () => {
    cy.get('[cy-data="menu_id_1]').within(() => {
      cy.get('[cy-data="product_title_1"]').should('contain', 'Tenderloins')
      cy.get('[cy-data="product_description_1"]').should('contain', 'Meat like pappa made it')
      cy.get('[cy-data="product_price_1"]').should('contain', '199')
    })
  })
})

