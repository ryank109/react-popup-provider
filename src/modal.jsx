// @flow
import React, { createRef, Fragment, PureComponent } from 'react';
import { createPortal } from 'react-dom';
import { Consumer, PopupProvider } from './provider';
import {
  getPopupPosition,
  getRandomId,
  hasBeenPreMounted,
  togglePreMountedFlag,
} from './utils';

import type {
  Anchor,
  ContextRef,
  ModalContainerProps,
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
  };

  ref: ContextRef;
  updatePosition: Function;

  constructor(props: ModalContainerProps) {
    super(props);
    this.ref = createRef();
    this.state = {
      left: 0,
      top: 0,
    };
    this.updatePosition = () => window.requestAnimationFrame(() => {
      this.computeAndSetPosition();
    });
  }

  computeAndSetPosition() {
    if (this.ref.current) {
      const { clientHeight, clientWidth } = this.ref.current;
      this.setState({
        left: (window.innerWidth - clientWidth) / 2,
        top: (window.innerHeight - clientHeight) / 2,
      });
    }
  }

  componentDidMount() {
    this.computeAndSetPosition();
    window.addEventListener('resize', this.updatePosition);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updatePosition);
  }

  render() {
    const {
      as: Component,
      children,
      className,
      close,
      isOpen,
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
        ref={this.ref}
        style={containerStyle}
      >
        {children({ close, isOpen })}
      </Component>,
      root,
    );
  }
};

ModalContainer.defaultProps = {
  as: 'div',
  root: document.body || document.createElement('div'),
};

export const Modal = (props: ModalProps) => (
  <PopupProvider>
    <Consumer>
      {props.context}
    </Consumer>
    <Consumer>
      {({
        close,
        isOpen,
      }) => (
        isOpen && <ModalContainer
          as={props.as}
          className={props.className}
          close={close}
          isOpen={isOpen}
          style={props.style}
        >
          {props.children}
        </ModalContainer>
      )}
    </Consumer>
  </PopupProvider>
);
