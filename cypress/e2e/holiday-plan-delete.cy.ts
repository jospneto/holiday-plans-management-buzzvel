import { format } from 'date-fns'

describe('GIVEN that I want to delete one holiday plan', () => {
  context('WHEN I access the system page', () => {
    const url = Cypress.env('URL')
    const api = Cypress.env('API')

    const deleteHolidayPlan = () => {
      cy.request({
        method: 'POST',
        url: `${api}holiday-plan-create`,
        body: {
          title: 'Create holiday plan',
          description: 'Create holiday plan with Cypress',
          date: format(new Date(), 'yyyy-MM-dd'),
          location: 'New York, NY',
        },
      }).then(({ body }) => {
        cy.visit(url)
        cy.getDataTestsId(`card-holiday-plan-${body._id}`).within(() => {
          cy.getDataTestsId('menu-actions-holiday-plans').click()
          cy.getDataTestsId('menu-delete-holiday-plans').click()
        })

        cy.getDataTestsId('delete-holiday-plan-modal')
          .should('be.visible')
          .within(() => {
            cy.contains('Delete').click()
          })
      })
    }

    it('THEN I should be able to delete my plan', () => {
      deleteHolidayPlan()

      cy.contains('Plan successfully deleted.').should('be.visible')
    })

    it('THEN I should see an alert informing me that an error has occurred', () => {
      cy.intercept('DELETE', `${api}holiday-plan/**`, {
        statusCode: 500,
      })

      deleteHolidayPlan()

      cy.contains(
        'An error occurred while trying to delete the plan. Please try again later.',
      ).should('be.visible')
    })
  })
})
