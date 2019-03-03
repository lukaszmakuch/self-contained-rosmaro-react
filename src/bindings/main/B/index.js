import React from 'react';
import { makeHandler } from '../../../utils.js';

export default () => ({
  handler: makeHandler({
    RENDER: () => "B"
  })
});