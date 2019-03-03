import graph from './graph.json';
import makeBindings from './bindings';
import rosmaro from 'rosmaro';
import React from 'react';
import RosmaroComponent from './rosmaroComponent';
import {triggerEntryActions} from 'rosmaro-binding-utils';

const bindings = makeBindings();

const model = triggerEntryActions(rosmaro({ graph, bindings }));

const App = () => <div>
  <RosmaroComponent model={model} />
  <RosmaroComponent model={model} init={{type: 'GO'}} />
</div>

export default App;
