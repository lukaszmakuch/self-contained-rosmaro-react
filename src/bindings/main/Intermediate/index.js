import { makeHandler } from '../../../utils.js';

export default () => ({
  handler: makeHandler({

    DONE: () => ({arrow: 'done'}),

    ON_ENTRY: () => {
      return {
        effect: {
          type: 'DISPATCH',
          action: { type: 'DONE' }
        }
      }
    }

  })
});