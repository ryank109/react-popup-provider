// @flow
import React, { PureComponent } from 'react';
import { Consumer } from './provider';

import type {
  ModalContextArgs,
  ModalContextProps,
  PopupContextArgs,
  PopupContextProps,
} from './types';

type WrapperProps = {
  children: PopupContextArgs => React$Node,
  createContextRef: string => { current: null | React$ElementRef<any> },
  id: string,
  openPopup: () => void,
  removeContextRef: string => void,
};

export const ModalContext = ({ children, modalId }: ModalContextProps) => (
  <Consumer>
    {({ getOpenPopupHandler }) => children({ openModal: getOpenPopupHandler(modalId) })}
  </Consumer>
);

class PopupContextWrapper extends PureComponent<WrapperProps> {
  componentWillUnmount() {
    this.props.removeContextRef(this.props.id);
  }

  render() {
    return this.props.children({
      contextRef: this.props.createContextRef(this.props.id),
      openPopup: this.props.openPopup,
    });
  }
}

export const PopupContext = ({ children, popupId }: PopupContextProps) => (
  <Consumer>
    {({
      createContextRef,
      getOpenPopupHandler,
      removeContextRef,
    }) => (
      <PopupContextWrapper
        createContextRef={createContextRef}
        id={popupId}
        openPopup={getOpenPopupHandler(popupId)}
        removeContextRef={removeContextRef}
      >
        {children}
      </PopupContextWrapper>
    )}
  </Consumer>
);
