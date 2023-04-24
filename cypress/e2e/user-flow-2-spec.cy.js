//2: As a user, I should be able to enter information into the order form and see my ingredient selections update. If I do not fill out the form correctly, I should see an error message, and my order should not be accepted

describe('user flow 2', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders',{

      fixture: "orders.json"
    })
    cy.visit('http://localhost:3000/')
  })

  it('should be able to enter name in the form', () => {
    cy.get('input').should('be.visible')
    cy.get('p').contains('Order: Nothing selected')
    cy.get('[name="beans"]').should('be.visible')

    cy.get('input').type('SpiderMan').should('have.value', 'SpiderMan')
  })
  
  it('should be able to choose ingredients in the form', () => {
    cy.get('p').contains('Order: Nothing selected')

    cy.get('[name="sofritas"]').click()
    cy.get('[name="lettuce"]').click()
    cy.get('[name="pico de gallo"]').should('be.visible')
    cy.get('[name="pico de gallo"]').click()
    cy.get('[name="hot sauce"]').should('be.visible')
    cy.get('[name="cilantro"]').click()

    cy.get('input').should('be.visible')
    cy.get('[name="beans"]').should('be.visible')
    cy.get(':nth-child(15)').should('be.visible')

    cy.contains('Order: sofritas, lettuce, pico de gallo, cilantro, hot sauce')
  })

  it('should be able to see an error message if I do not fill out both inputs', () => {
    cy.get('p').contains('Order: Nothing selected')

    cy.get('[name="sofritas"]').click()
    cy.get('[name="lettuce"]').click()

    cy.get('input').should('be.visible')
    cy.get(':nth-child(15)').should('be.visible').click()
    cy.get('section > :nth-child(4)').should('not.exist')

    cy.on('window:alert', (text) => {
      expect(text).to.contains('please choose at least one ingredient, and make sure you put in your name!')
    })
  })
})