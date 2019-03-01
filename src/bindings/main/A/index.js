import React from 'react';
import { makeHandler } from '../../../utils.js';

export default () => ({
  handler: makeHandler({
    
    GO: () => ({ arrow: 'go' }),

    RENDER: ({ action: { dispatch } }) => <div>
      <button onClick={() => dispatch({type: 'GO'})}>A</button>
    </div>

  })
});