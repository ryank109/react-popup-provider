// @flow
import React, {
  createContext,
  createRef,
  PureComponent,
} from 'react';
import { getAllScrollableParents } from './utils';

import type {
  GenericFunc,
  ProviderValue,
} from './types';

type PopupProps = {
  children: React$Node,
};

const noop = () => {};
const DEFAULT: ProviderValue = {
  close: noop,
  contextRef: createRef(),
  isOpen: false,
  open: noop,
  scrollableParents: [],
};

const { Provider, Consumer } = createContext<ProviderValue>(DEFAULT);

class PopupProvider extends PureComponent<PopupProps, ProviderValue> {
  close: GenericFunc;
  open: GenericFunc;

  constructor(props: PopupProps) {
    super(props);

    this.close = () => {
      this.setState({ isOpen: false });
    };

    this.open = () => {
      this.setState(({ contextRef }) => {
        const elem = contextRef && contextRef.current;
        const scrollableParents = elem ? getAllScrollableParents(elem) : [];
        return {
          isOpen: true,
          scrollableParents,
        };
      });
    };

    this.state = {
      close: this.close,
      contextRef: createRef(),
      isOpen: false,
      open: this.open,
      scrollableParents: [],
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
