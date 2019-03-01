import { makeHandler } from '../../../utils.js';

export default () => ({
  handler: makeHandler({

    DONE: () => ({arrow: 'done'}),

    EXEC: () => {
      return {
        effect: {
          type: 'DISPATCH',
          action: { type: 'DONE' }
        }
      }
    }

  })
});