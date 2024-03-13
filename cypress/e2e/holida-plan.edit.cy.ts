import { format } from 'date-fns'

describe('GIVEN that I want to manage my holiday plans', () => {
  context('WHEN I access the system page', () => {
    const url = Cypress.env('URL')
    const api = Cypress.env('API')

    const editHolidayPlan = () => {
      cy.request({
        method: 'POST',
        url: `${api}holiday-plan-create`,
        body: {
          title: 'Create holiday plan',
          description: 'Create holiday plan with Cypress',
          date: format(new Date(), 'yyyy-MM-dd'),
          location: 'New York, NY',
          participants: [
            {
              name: 'John',
              avatar: 'Cypress Avatar',
              email: 'john@cypress.com.usa',
            },
          ],
        },
      }).then(({ body }) => {
        cy.visit(url)
        cy.getDataTestsId(`card-holiday-plan-${body._id}`).within(() => {
          cy.getDataTestsId('menu-actions-holiday-plans').click()
          cy.getDataTestsId('menu-edit-holiday-plans').click()
        })

        cy.getDataTestsId('holiday-plan-create-modal')
          .should('be.visible')
          .within(() => {
            cy.get('input[name="title"]')
              .should('contain.value', 'Create holiday plan')
              .type('Plan edit create for Cypress')
            cy.get('textarea[name="description"]')
              .should('contain.value', 'Create holiday plan with Cypress')
              .type('This plan create for Cypress edit')
            cy.get('input[name="date"]').should(
              'contain.value',
              format(new Date(), 'yyyy-MM-dd'),
            )
            cy.get('input[name="location"]').should(
              'contain.value',
              'New York, NY',
            )
            cy.contains('Add participant').should('be.visible')
          })

        cy.getDataTestsId('create-holiday-plan-modal-footer').within(() => {
          cy.getDataTestsId('create-or-edit-button').click()
        })
      })
    }

    it('THEN I should edit a plan', () => {
      editHolidayPlan()
      cy.contains('Plan successfully updated.').should('be.visible')
    })

    it('THEN I should see an alert informing me that an error has occurred', () => {
      cy.intercept('PUT', `${api}holiday-plan/**`, {
        statusCode: 500,
      })

      editHolidayPlan()

      cy.contains(
        'An error occurred while trying to updated the plan. Please try again later.',
      ).should('be.visible')
    })
  })
})
