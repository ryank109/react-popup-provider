// @flow
import React, { createRef, Component } from 'react';
import { createPortal } from 'react-dom';

import type {
  ContainerProps,
  ContextRef,
} from './types';

type ModalContainerState = {
  left: number,
  top: number,
};

export default class ModalContainer extends Component<ContainerProps, ModalContainerState> {
  static defaultProps: {
    as: 'div',
    root: HTMLElement,
  };

  ref: ContextRef;
  updatePosition: Function;

  constructor(props: ContainerProps) {
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
      as: ContainerComponent,
      children,
      className,
      close,
      root,
      style,
    } = this.props;
    const {
      left,
      top,
    } = this.state;
    const containerStyle = {
      left,
      position: 'fixed',
      top,
      ...style,
    };
    return createPortal(
      <ContainerComponent
        className={className}
        ref={this.ref}
        style={containerStyle}
      >
        {children({ close, left, top })}
      </ContainerComponent>,
      root,
    );
  }
};

ModalContainer.defaultProps = {
  as: 'div',
  root: document.body || document.createElement('div'),
};
