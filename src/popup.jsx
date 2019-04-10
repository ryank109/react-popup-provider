// @flow
import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import { Consumer, PopupProvider } from './provider';
import { getPopupPosition } from './utils';

import type {
  Anchor,
  PopupContainerProps,
  PopupProps,
} from './types';

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

export class PopupContainer extends PureComponent<PopupContainerProps, PopupContainerState> {
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

  constructor(props: PopupContainerProps) {
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
    // this.props.close();
    window.removeEventListener('mousedown', this.focusOut);
    window.removeEventListener('resize', this.updatePosition);
    this.props.scrollableParents.forEach(
      parentElem => parentElem.removeEventListener('scroll', this.updatePosition));
  }

  render() {
    const {
      as: Component,
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
      <Component
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
      </Component>,
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
  willBePreMounted: false,
};

export const Popup = (props: PopupProps) => (
  <PopupProvider>
    <Consumer>
      {props.context}
    </Consumer>
    <Consumer>
      {({
        close,
        contextRef,
        isOpen,
        scrollableParents,
      }) => (
        isOpen && <PopupContainer
          as={props.as}
          anchor={props.anchor}
          className={props.className}
          contextRef={contextRef}
          close={close}
          offset={props.offset}
          scrollableParents={scrollableParents}
          shouldCenterToContext={props.shouldCenterToContext}
          style={props.style}
        >
          {props.children}
        </PopupContainer>
      )}
    </Consumer>
  </PopupProvider>
);
