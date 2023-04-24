//USER FLOWS
//1: on page load, as a user I should see the title, a form, and any existing orders
//2: As a user, I should be able to enter information into the order form and see my ingredient selections update. If I do not fill out the form correctly, I should see an error message, and my order should not be accepted
//3: As a user, if my order was successfully submitted, I should see in the list of orders. 


describe('user flow 1', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders',{

      fixture: "orders.json"
    })
    cy.visit('http://localhost:3000/')
  })

  it('should show the title', () => {
    cy.get('h1').contains('Burrito Builder')
  })

  it('should show the form', () => {
    cy.get('input').should('be.visible')
    cy.get('p').contains('Order: Nothing selected')
    cy.get('[name="beans"]').should('be.visible')
    cy.get('[name="steak"]').should('be.visible')
    cy.get('[name="queso fresco"]').should('be.visible')
    cy.get('[name="guacamole"]').should('be.visible')
    cy.get('[name="sour cream"]').should('be.visible')
    cy.get(':nth-child(15)').should('be.visible')
  })

  it('should show any existing orders', () => {
    cy.get('section > :nth-child(1)').should('be.visible')
    cy.get('section > :nth-child(2)').should('be.visible')
    cy.get('section > :nth-child(3)').should('be.visible')
    cy.get(':nth-child(1) > h3').contains('Pat')
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(1)').contains('beans')
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(2)').contains('lettuce')
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(3)').contains('carnitas')
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(4)').contains('queso fresco')
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(5)').contains('jalapeno')
  })
})