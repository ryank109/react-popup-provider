// @flow
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { getPopupPosition } from './utils';

import type { ContainerProps } from './types';

type PopupContainerState = {
  contextClientRect?: ClientRect,
  left: number,
  top: number,
};

function isElementInContext(element, context) {
  let parent = element;
  while (parent) {
    if (parent === context) {
      return true;
    }
    parent = parent.parentElement;
  }
  return false;
}

export default class PopupContainer extends Component<ContainerProps, PopupContainerState> {
  static defaultProps: {
    anchor: 'bottom',
    as: 'div',
    offset: 0,
    root: HTMLElement,
  };

  el: ?HTMLElement;
  focusOut: Function;
  setRef: Function;
  updatePosition: Function;

  constructor(props: ContainerProps) {
    super(props);
    this.state = {
      left: 0,
      top: 0,
    };

    if (props.contextRef.current) {
      this.state.contextClientRect = props.contextRef.current.getBoundingClientRect();
    }

    this.setRef = el => {
      this.el = el;
    };
    this.updatePosition = () => window.requestAnimationFrame(() => {
      this.computeAndSetPosition();
    });
    this.focusOut = (evt) => {
      if (this.el
        && this.props.contextRef.current
        && (isElementInContext(evt.target, this.el)
        || isElementInContext(evt.target, this.props.contextRef.current))) {
        return;
      }
      this.props.close();
    };
  }

  computeAndSetPosition() {
    const {
      anchor,
      contextRef,
      offset,
      shouldCenterToContext,
    } = this.props;
    const { current } = contextRef;
    if (this.el && current) {
      const popupRect = this.el.getBoundingClientRect();
      const contextClientRect = current.getBoundingClientRect();
      const position = getPopupPosition(
        anchor,
        contextClientRect,
        popupRect.width,
        popupRect.height,
        window.innerWidth,
        window.innerHeight,
        offset,
        shouldCenterToContext,
      );
      this.setState({
        ...position,
        contextClientRect,
      });
    }
  }

  componentDidMount() {
    this.computeAndSetPosition();
    window.addEventListener('mousedown', this.focusOut);
    window.addEventListener('resize', this.updatePosition);
    this.props.scrollableParents.forEach(
      parentElem => parentElem.addEventListener('scroll', this.updatePosition));
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.focusOut);
    window.removeEventListener('resize', this.updatePosition);
    this.props.scrollableParents.forEach(
      parentElem => parentElem.removeEventListener('scroll', this.updatePosition));
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
      contextClientRect,
    } = this.state;
    const containerStyle = {
      left,
      position: 'absolute',
      top,
      ...style,
    };
    return createPortal(
      <ContainerComponent
        className={className}
        ref={this.setRef}
        style={containerStyle}
      >
        {children({
          close,
          contextClientRect,
          left,
          top,
        })}
      </ContainerComponent>,
      root,
    );
  }
};

PopupContainer.defaultProps = {
  anchor: 'bottom',
  as: 'div',
  offset: 0,
  root: document.body || document.createElement('div'),
  shouldCenterToContext: false,
};
