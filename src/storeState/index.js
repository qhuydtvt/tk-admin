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

const isExistedInLocalStorage = (state) => {
  if (localStorage.getItem(state) === null) {
    return false;
  }
  return true;
};

const mapFromLocalStorageToData = (state) => {
  // console.log(state);
  let newStateStore = state;
  const listState = Object.keys(state);
  listState.forEach((state) => {
    if (isExistedInLocalStorage(state)) {
      const valueInLocalOfState = JSON.parse(localStorage.getItem(state));
      newStateStore = { ...newStateStore, [state]: valueInLocalOfState };
    }
  });
  // console.log(newStateStore);
  return newStateStore;
};

export default (statePar, choose = undefined) => Component => class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeStateOfComponent: choose === 'loadFromLocal' ? mapFromLocalStorageToData(Store(statePar)) : Store(statePar),
    };
    this.changeState = this.changeState.bind(this);
    this.resetAllToDefault = this.resetAllToDefault.bind(this);
  }

  resetAllToDefault(statePar) {
    this.setState({
      storeStateOfComponent: Store(statePar),
    });
  }

  changeState(state, option = undefined) {
    const { storeStateOfComponent } = this.state;
    if (option === 'saveToLocal') {
      const listState = Object.keys(state);
      const listValue = Object.values(state);
      listState.forEach((state, index) => {
        localStorage.setItem(state, listValue[index]);
      },);
    }
    this.setState({
      storeStateOfComponent: {
        ...storeStateOfComponent, ...state,
      },
    });
  }

  render() {
    const { storeStateOfComponent } = this.state;
    // console.log(storeStateOfComponent);
    return (
        <Component changeState={this.changeState} storeState={storeStateOfComponent} />
    );
  }
};
