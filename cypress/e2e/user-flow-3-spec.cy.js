//3: As a user, if my order was successfully submitted, I should see in the list of orders. 

describe('user flow 3', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders',{
      fixture: "orders.json"
    })
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders',{
      fixture: "newOrder.json"
    })
    cy.visit('http://localhost:3000/')
  })

  it('should be able to submit an order', () => {
    cy.get('input').type('SpiderMan').should('have.value', 'SpiderMan')
    cy.get('[name="sofritas"]').should('be.visible').click()
    cy.get('[name="lettuce"]').should('be.visible').click()
    cy.get('[name="hot sauce"]').should('be.visible').click()
    cy.get(':nth-child(15)').should('be.visible').click()

    cy.get('section > :nth-child(4)').should('be.visible')
    cy.get(':nth-child(4) > h3').should('be.visible').contains('SpiderMan')
  })

  it('should see an error message if the post request was not successful', () => {
    cy.get('input').type('SpiderMan').should('have.value', 'SpiderMan')
    cy.get('[name="sofritas"]').should('be.visible').click()
    cy.get('[name="lettuce"]').should('be.visible').click()
    cy.get('[name="hot sauce"]').should('be.visible').click()
    cy.get(':nth-child(15)').should('be.visible').click()

    cy.get('section > :nth-child(4)').should('be.visible')
    cy.get(':nth-child(4) > h3').should('be.visible').contains('SpiderMan')
  })
})

describe('SAD: user flow 3', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders',{
      fixture: "orders.json"
    })
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders',{
      statusCode: 500
    })
    cy.visit('http://localhost:3000/')
  })

  it('should see an error message if the post request was not successful', () => {
    cy.get('input').type('SpiderMan').should('have.value', 'SpiderMan')
    cy.get('[name="sofritas"]').should('be.visible').click()
    cy.get('[name="lettuce"]').should('be.visible').click()
    cy.get('[name="hot sauce"]').should('be.visible').click()
    cy.get(':nth-child(15)').should('be.visible').click()

    cy.on('window:alert', (text) => {
      expect(text).to.contains('Something went wrong, please try again later or call in your order. Error')
    })
  })
})
