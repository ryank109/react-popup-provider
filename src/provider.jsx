// @flow
import React, {
  createContext,
  createRef,
  PureComponent,
} from 'react';

import type {
  GenericFunc,
  ProviderValue,
} from './types';

type PopupProps = {
  children: React$Node,
  isOpen?: boolean
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
      if (this.props.isOpen === undefined) {
        this.setState({ isOpen: false });
      }
    };

    this.open = () => {
      if (this.props.isOpen === undefined) {
        this.setState({ isOpen: true });
      }
    };

    this.state = {
      close: this.close,
      contextRef: createRef(),
      isOpen: props.isOpen === undefined ? false : props.isOpen,
      open: this.open,
    };
  }

  componentDidUpdate(prevProps: PopupProps) {
    if (prevProps.isOpen !== this.props.isOpen) {
      this.setState({ isOpen: this.props.isOpen });
    }
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
