import graph from './graph.json';
import makeBindings from './bindings';
import rosmaro from 'rosmaro';
import makeRosmaroComponent from './rosmaroComponent';

const bindings = makeBindings();

const model = rosmaro({ graph, bindings });

const App = makeRosmaroComponent({ model });

export default App;
