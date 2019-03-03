import { Component } from 'react';

const defaultHandlers = {
  DISPATCH: dispatch => async effect => {
    dispatch(effect.action);
  }
};

export default ({ model, handlers: customHandlers }) => {
  let state = undefined;
  let renderableState = undefined;

  let update = () => { };
  const dispatch = action => {
    const { state: newState, result: { effect } } = model({ state, action });
    state = newState;
    dispatchEffect(effect);
    update();
  }

  const handlers = { ...defaultHandlers, ...customHandlers };

  const interpretEffect = effect => {
    const handler = handlers[effect.type];
    if (handler) handler(dispatch)(effect);
  }

  const dispatchEffect = effect => {
    if (!effect) return;
    if (Array.isArray(effect)) effect.flat().forEach(interpretEffect);
    interpretEffect(effect);
  }

  const renderAction = {
    type: 'RENDER',
    dispatch
  };

  const rosmaroComponent = class extends Component {
    componentDidMount() {
      update = this.forceUpdate.bind(this);
    }
    render() {
      const { state: renderedState, result: { data: rendered } } = model({ state, action: renderAction });
      if (rendered) {
        renderableState = renderedState;
        return rendered;
      } else if (renderableState) {
        return model({ state: renderableState, action: renderAction }).result.data;
      } else {
        return null;
      }
    }
  }

  return rosmaroComponent;
}