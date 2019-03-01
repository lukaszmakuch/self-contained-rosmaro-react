import { makeHandler } from '../../../utils.js';

export default () => ({
  handler: makeHandler({
    RENDER: () => "B"
  })
});