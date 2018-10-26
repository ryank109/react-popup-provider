// @flow
import React, { PureComponent } from 'react';
import { Consumer } from './provider';

import type {
  CloseModal,
  ClosePopup,
  ContextRef,
  ModalContextArgs,
  ModalContextProps,
  OpenModal,
  OpenPopup,
  PopupContextArgs,
  PopupContextProps,
} from './types';

export class ModalContext extends PureComponent<ModalContextProps> {
  getCloseModalHandler: (string => CloseModal) => CloseModal;
  getOpenModalHandler: (string => OpenModal) => OpenModal;

  constructor(props: ModalContextProps) {
    super(props);

    let closeModal;
    let openModal;
    this.getCloseModalHandler = getter => {
      if (!closeModal) {
        closeModal = getter(props.modalId);
      }
      return closeModal;
    }
    this.getOpenModalHandler = getter => {
      if (!openModal) {
        openModal = getter(props.modalId);
      }
      return openModal;
    }
  }

  render() {
    return (
      <Consumer>
        {({
          getClosePopupHandler,
          getOpenPopupHandler,
          popupStateMap,
        }) => this.props.children({
          closeModal: this.getCloseModalHandler(getClosePopupHandler),
          isOpen: !!popupStateMap[this.props.modalId],
          openModal: this.getOpenModalHandler(getOpenPopupHandler),
        })}
      </Consumer>
    );
  }
}

export class PopupContext extends PureComponent<PopupContextProps> {
  getClosePopupHandler: (string => ClosePopup) => ClosePopup;
  getContextRef: (string => ContextRef, string => void) => ContextRef;
  getOpenPopupHandler: (string => OpenPopup) => OpenPopup;
  removeContextRef: string => void;

  constructor(props: PopupContextProps) {
    super(props);

    let contextRef = null;
    let closePopup = null;
    let openPopup = null;
    this.getContextRef = (factory, removeContextRef) => {
      if (!contextRef) {
        contextRef = factory(props.popupId);
        this.removeContextRef = removeContextRef;
      }
      return contextRef;
    };
    this.getClosePopupHandler = getter => {
      if (!closePopup) {
        closePopup = getter(props.popupId);
      }
      return closePopup;
    };
    this.getOpenPopupHandler = getter => {
      if (!openPopup) {
        openPopup = getter(props.popupId);
      }
      return openPopup;
    };
  }

  componentWillUnmount() {
    this.removeContextRef(this.props.popupId);
  }

  render() {
    return (
      <Consumer>
        {({
          createContextRef,
          getClosePopupHandler,
          getOpenPopupHandler,
          popupStateMap,
          removeContextRef,
        }) => this.props.children({
          contextRef: this.getContextRef(createContextRef, removeContextRef),
          closePopup: this.getClosePopupHandler(getClosePopupHandler),
          isOpen: !!popupStateMap[this.props.popupId],
          openPopup: this.getOpenPopupHandler(getOpenPopupHandler),
        })}
      </Consumer>
    );
  }
}
