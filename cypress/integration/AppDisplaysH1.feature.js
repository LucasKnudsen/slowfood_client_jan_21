describe('App displays the wanted elements', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001')
  })

  it('displays header containing Slowfood', () => {
    cy.get('.header').should('exist')
  })
})