import React, { Component } from 'react';

const defaultHandlers = {
  DISPATCH: dispatch => async effect => {
    dispatch(effect.action);
  }
};

export default class extends Component {
  constructor(props) {
    super(props);
    this.rosmaroState = undefined;
    this.recentRenderableState = undefined;
    this.renderAction = undefined;
    this.handlers = { ...defaultHandlers, ...props.customHandlers };

    this.dispatch = action => {
      const { state: newState, result: { effect } } = props.model({ state: this.rosmaroState, action });
      this.rosmaroState = newState;
      this.dispatchEffect(effect);
      this.forceUpdate();
    }

    this.renderAction = {
      type: 'RENDER',
      dispatch: this.dispatch
    }
  }

  static defaultProps = {
    customHandler: []
  }

  componentDidMount() {
    if (this.props.init) {
      this.dispatch(this.props.init);
    }
  }

  render() {
    const {state: renderableState, result: {data: rendered}} = this.props.model({
      state: this.rosmaroState,
      action: this.renderAction
    });
    if (rendered) {
      this.recentRenderableState = renderableState;
      return rendered;
    } else if (this.recentRenderableState) {
      return this.props.model({ state: this.recentRenderableState, action: this.renderAction }).result.data;
    } else {
      return null;
    }
  }

  dispatchEffect(effect) {
    if (!effect) return;
    if (Array.isArray(effect)) effect.flat().forEach(this.interpretEffect);
    this.interpretEffect(effect);
  }

  interpretEffect = (effect) => {
    const handler = this.handlers[effect.type];
    if (handler) handler(this.dispatch)(effect);
  }

}
