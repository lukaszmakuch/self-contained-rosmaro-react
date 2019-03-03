import graph from './graph.json';
import makeBindings from './bindings';
import rosmaro from 'rosmaro';
import makeRosmaroComponent from './rosmaroComponent';
import {triggerEntryActions} from 'rosmaro-binding-utils';

const bindings = makeBindings();

const model = triggerEntryActions(rosmaro({ graph, bindings }));

const App = makeRosmaroComponent({ model });

export default App;
