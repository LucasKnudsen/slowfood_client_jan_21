describe('App displays the wanted elements', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays header containing Slowfood', () => {
    cy.get('.header').should('exist')
  })
})