import { format } from 'date-fns'

describe('GIVEN that I want to manage my holiday plans', () => {
  context('WHEN I access the system page', () => {
    const url = Cypress.env('URL')
    const api = Cypress.env('API')

    const createHolidayPlan = () => {
      cy.visit(url)

      cy.getDataTestsId('holiday-plan-create-button').should('exist').click()
      cy.getDataTestsId('holiday-plan-create-modal')
        .should('be.visible')
        .within(() => {
          cy.get('input[name="title"]').type('Plan create for Cypress')
          cy.get('textarea[name="description"]').type(
            'This plan create for Cypress',
          )
          cy.get('input[name="date"]').type(format(new Date(), 'yyyy-MM-dd'))
          cy.get('input[name="location"]').type('New York, NY')
          cy.getDataTestsId('open-select-participants-any').click()
        })

      cy.getDataTestsId('selected-participants-modal').within(() => {
        cy.getDataTestsId('selected-participants').click({ multiple: true })
      })

      cy.getDataTestsId('selected-participants-modal-footer').within(() => {
        cy.contains('Selected').click()
      })

      cy.getDataTestsId('create-holiday-plan-modal-footer').within(() => {
        cy.getDataTestsId('create-or-edit-button').click()
      })
    }

    it('THEN I should create a plan', () => {
      createHolidayPlan()
      cy.contains('Plan successfully created.').should('be.visible')
    })

    it('THEN I should see an alert informing me that an error has occurred', () => {
      cy.intercept('POST', `${api}holiday-plan-create`, {
        statusCode: 500,
      })

      createHolidayPlan()

      cy.contains(
        'An error occurred while trying to create the plan. Please try again later.',
      ).should('be.visible')
    })
  })
})
