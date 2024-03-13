// eslint-disable-next-line @typescript-eslint/no-unused-vars
import cypress = require('cypress')

declare global {
  namespace Cypress {
    interface Chainable {
      getDataTestsId<E extends Node = HTMLElement>(
        selector: string,
        options?: Partial<Loggable & Timeoutable & Withinable & Shadow>,
      ): Chainable<JQuery<E>>
    }
  }
}
