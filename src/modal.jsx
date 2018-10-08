// @flow
import React, { Fragment, PureComponent } from 'react';
import { createPortal } from 'react-dom';
import { ModalContext } from './context';
import { Consumer } from './provider';
import { getPopupPosition } from './utils';

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
  parentEl: HTMLElement;
  el: ?HTMLElement;
  updatePosition: Function;

  constructor(props: ModalContainerProps) {
    super(props);
    this.state = {
      left: 0,
      top: 0,
    };
    this.parentEl = document.createElement('div');

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
    if (document.body) {
      document.body.appendChild(this.parentEl);
    }

    this.computeAndSetPosition();
    global.addEventListener('resize', this.updatePosition);
  }

  componentWillUnmount() {
    this.props.closeModal();
    if (document.body) {
      document.body.removeChild(this.parentEl);
    }
    global.removeEventListener('resize', this.updatePosition);
  }

  render() {
    const style = {
      position: 'fixed',
      ...this.state,
      ...this.props.style,
    };
    return createPortal(
      <div
        className={this.props.className}
        ref={ el => { this.el = el; }}
        style={style}
      >
        {this.props.children({ closeModal: this.props.closeModal })}
      </div>,
      this.parentEl,
    );
  }
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
    this.id = props.id || Math.random().toString(36).substr(2);
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
