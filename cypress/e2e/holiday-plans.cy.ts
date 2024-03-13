import { format } from 'date-fns'

describe('GIVEN that I want to manage my holiday plans', () => {
  context('WHEN I access the system page', () => {
    const url = Cypress.env('URL')
    const api = Cypress.env('API')

    it('THEN I should not visualize any plan', () => {
      cy.intercept('GET', `${api}/**`, {
        body: [],
      }).as('getHolidayPlans')

      cy.visit(url)

      cy.wait('@getHolidayPlans')
      cy.getDataTestsId('card-holiday-plan-root').should('not.exist')
    })

    it.only('THEN I should not visualize any plan', () => {
      cy.request({
        method: 'POST',
        url: `${api}holiday-plan-create`,
        body: [
          {
            title: 'Create holiday plan',
            description: 'Create holiday plan with Cypress',
            date: format(new Date(), 'yyyy-MM-dd'),
            location: 'New York, NY',
          },
        ],
      }).then(({ body }) => {
        cy.visit(url)
        cy.getDataTestsId('card-holiday-plan-root').should('exist')
        cy.getDataTestsId(`card-holiday-plan-${body._id}`).should('exist')
      })
    })
  })
})
