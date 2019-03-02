import React from 'react';

const Store = (arrayState) => {
  let newStoreState = {};
  arrayState.forEach((state) => {
    newStoreState = {
      ...newStoreState, ...state,
    };
  });
  return newStoreState;
};

export default function storeState(statePar) {
  return Component => class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        storeStateOfComponent: Store(statePar),
      };
      this.changeState = this.changeState.bind(this);
    }

    changeState(state) {
      const { storeStateOfComponent } = this.state;
      this.setState({
        storeStateOfComponent: {
          ...storeStateOfComponent, ...state,
        },
      });
    }

    render() {
      const { storeStateOfComponent } = this.state;
      return (
        <Component changeState={this.changeState} storeState={storeStateOfComponent} />
      );
    }
  };
}
