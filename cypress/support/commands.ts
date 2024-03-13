Cypress.Commands.add('getDataTestsId', (selector, option) => {
  return cy.get(`[data-testid="${selector}"]`, option)
})
