// @flow
import React, { Fragment, PureComponent } from 'react';
import { createPortal } from 'react-dom';
import { ModalContext } from './context';
import { Consumer } from './provider';
import {
  getPopupPosition,
  getRandomId,
  hasBeenPreMounted,
  togglePreMountedFlag,
} from './utils';

import type {
  Anchor,
  ModalContainerProps,
  ModalContextArgs,
  ModalDefArgs,
  ModalDefProps,
  ModalProps,
} from './types';

type ModalContainerState = {
  left: number,
  top: number,
};

export class ModalContainer extends PureComponent<ModalContainerProps, ModalContainerState> {
  static defaultProps: {
    as: 'div',
    root: HTMLElement,
    willBePreMounted: false,
  };

  el: ?HTMLElement;
  setRef: Function;
  updatePosition: Function;

  constructor(props: ModalContainerProps) {
    super(props);
    this.state = {
      left: 0,
      top: 0,
    };
    this.setRef = el => {
      this.el = el;
    };
    this.updatePosition = () => global.requestAnimationFrame(() => {
      this.computeAndSetPosition();
    });
  }

  computeAndSetPosition() {
    if (this.el) {
      const { clientHeight, clientWidth } = this.el;
      this.setState({
        left: (window.innerWidth - clientWidth) / 2,
        top: (window.innerHeight - clientHeight) / 2,
      });
    }
  }

  componentDidMount() {
    if (!this.props.willBePreMounted || hasBeenPreMounted(this.props.id)) {
      this.computeAndSetPosition();
      global.addEventListener('resize', this.updatePosition);
    }
  }

  componentWillUnmount() {
    if (!this.props.willBePreMounted || hasBeenPreMounted(this.props.id)) {
      this.props.closeModal();
      global.removeEventListener('resize', this.updatePosition);
    }

    if (this.props.willBePreMounted) {
      togglePreMountedFlag(this.props.id);
    }
  }

  render() {
    const {
      as: Component,
      children,
      className,
      closeModal,
      root,
      style,
    } = this.props;
    const containerStyle = {
      position: 'fixed',
      ...this.state,
      ...style,
    };
    return createPortal(
      <Component
        className={className}
        ref={this.setRef}
        style={containerStyle}
      >
        {children({ closeModal })}
      </Component>,
      root,
    );
  }
};

ModalContainer.defaultProps = {
  as: 'div',
  root: document.body || document.createElement('div'),
  willBePreMounted: false,
};

export const ModalDef = (props: ModalDefProps) => (
  <Consumer>
    {({
      popupStateMap,
      getClosePopupHandler,
    }) => props.children({
      closeModal: getClosePopupHandler(props.id),
      isOpen: !!popupStateMap[props.id],
    })}
  </Consumer>
);

export class Modal extends PureComponent<ModalProps> {
  id: string;

  constructor(props: ModalProps) {
    super(props);
    this.id = getRandomId();
  }

  render() {
    const [context, def] = this.props.children;
    return (
      <Fragment>
        <ModalContext
          modalId={this.id}
        >
          {context}
        </ModalContext>
        <ModalDef
          id={this.id}
        >
          {({
            closeModal,
            isOpen,
          }) => (
            isOpen && <ModalContainer
              className={this.props.className}
              closeModal={closeModal}
              style={this.props.style}
            >
              {def}
            </ModalContainer>
          )}
        </ModalDef>
      </Fragment>
    );
  }
}
