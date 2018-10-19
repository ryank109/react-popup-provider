// @flow
import React, {
  createContext,
  createRef,
  PureComponent,
} from 'react';
import { getAllScrollableParents } from './utils';

import type { ProviderValue } from './types';

type PopupProps = {
  children: React$Node,
};

const noop = () => {};
const DEFAULT: ProviderValue = {
  createContextRef: () => createRef(),
  getClosePopupHandler: () => noop,
  getOpenPopupHandler: () => noop,
  popupStateMap: {},
  removeContextRef: noop,
};

const { Provider, Consumer } = createContext<ProviderValue>(DEFAULT);

class PopupProvider extends PureComponent<PopupProps, ProviderValue> {
  contextRefMap: { [string]: { current: null | React$ElementRef<any> } };
  createContextRef: string => { current: null | React$ElementRef<any> };
  getClosePopupHandler: string => () => void;
  getOpenPopupHandler: string => () => void;
  removeContextRef: string => void;

  constructor(props: PopupProps) {
    super(props);

    this.contextRefMap = {};

    this.getClosePopupHandler = (id) => () => {
      this.setState(({ popupStateMap }) => {
        delete popupStateMap[id];
        return ({
          popupStateMap: { ...popupStateMap },
        });
      });
    };

    this.getOpenPopupHandler = (id) => () => {
      const state = this.state.popupStateMap[id];
      if (!state) {
        let scrollableParents;
        const contextRef = this.contextRefMap[id];
        const elem = contextRef && contextRef.current;
        if (elem) {
          scrollableParents = getAllScrollableParents(elem);
        }
        this.setState(({ popupStateMap }) => ({
          popupStateMap: {
            ...popupStateMap,
            [id]: {
              contextRef: elem,
              scrollableParents,
            },
          },
        }));
      }
    };

    this.createContextRef = id => {
      if (!this.contextRefMap[id]) {
        this.contextRefMap[id] = createRef();
      }
      return this.contextRefMap[id];
    };

    this.removeContextRef = id => {
      delete this.contextRefMap[id];
    };

    this.state = {
      getClosePopupHandler: this.getClosePopupHandler,
      getOpenPopupHandler: this.getOpenPopupHandler,
      popupStateMap: {},
      createContextRef: this.createContextRef,
      removeContextRef: this.removeContextRef,
    };
  }

  render() {
    return (
      <Provider value={this.state}>
        {this.props.children}
      </Provider>
    );
  }
}

export {
  Consumer,
  PopupProvider,
};
