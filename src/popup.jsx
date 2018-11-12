// @flow
import React, { Fragment, PureComponent } from 'react';
import { createPortal } from 'react-dom';
import { PopupContext } from './context';
import { Consumer } from './provider';
import {
  getPopupPosition,
  getRandomId,
  hasBeenPreMounted,
  togglePreMountedFlag,
} from './utils';

import type {
  Anchor,
  PopupContainerProps,
  PopupDefArgs,
  PopupDefProps,
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
    willBePreMounted: false,
  };

  el: ?HTMLElement;
  focusOut: Function;
  setRef: Function;
  updatePosition: Function;

  constructor(props: PopupContainerProps) {
    super(props);
    this.state = {
      contextClientRect: props.contextRef && props.contextRef.getBoundingClientRect(),
      left: 0,
      top: 0,
    };
    this.setRef = el => {
      this.el = el;
    };
    this.updatePosition = () => global.requestAnimationFrame(() => {
      this.computeAndSetPosition();
    });
    this.focusOut = (evt) => {
      if (this.el
        && this.props.contextRef
        && (isElementInContext(evt.target, this.el)
        || isElementInContext(evt.target, this.props.contextRef))) {
        return;
      }
      this.props.closePopup();
    };
  }

  computeAndSetPosition() {
    const {
      anchor,
      contextRef,
      offset,
    } = this.props;
    if (this.el && contextRef) {
      const popupRect = this.el.getBoundingClientRect();
      const contextClientRect = contextRef.getBoundingClientRect();
      const position = getPopupPosition(
        anchor,
        contextClientRect,
        popupRect.width,
        popupRect.height,
        global.innerWidth,
        global.innerHeight,
        offset,
      );
      this.setState({
        ...position,
        contextClientRect,
      });
    }
  }

  componentDidMount() {
    if (!this.props.willBePreMounted || hasBeenPreMounted(this.props.id)) {
      this.computeAndSetPosition();
      global.addEventListener('mouseup', this.focusOut);
      global.addEventListener('resize', this.updatePosition);
      this.props.scrollableParents.forEach(
        parentElem => parentElem.addEventListener('scroll', this.updatePosition));
    }
  }

  componentWillUnmount() {
    if (!this.props.willBePreMounted || hasBeenPreMounted(this.props.id)) {
      this.props.closePopup();
      global.removeEventListener('mouseup', this.focusOut);
      global.removeEventListener('resize', this.updatePosition);
      this.props.scrollableParents.forEach(
        parentElem => parentElem.removeEventListener('scroll', this.updatePosition));
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
      closePopup,
      root,
      style,
    } = this.props;
    const {
      left,
      top,
      contextClientRect,
    } = this.state;
    const containerStyle = {
      position: 'absolute',
      left,
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
          contextClientRect,
          closePopup,
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
  willBePreMounted: false,
};

export const PopupDef = (props: PopupDefProps) => (
  <Consumer>
    {({
      getClosePopupHandler,
      popupStateMap,
    }) => {
      const isOpen = !!popupStateMap[props.id];
      const {
        contextRef,
        scrollableParents = []
      } = popupStateMap[props.id] || {};
      return props.children({
        closePopup: getClosePopupHandler(props.id),
        contextRef,
        isOpen,
        scrollableParents,
      });
    }}
  </Consumer>
);

export class Popup extends PureComponent<PopupProps> {
  id: string;

  constructor(props: PopupProps) {
    super(props);
    this.id = getRandomId();
  }

  render() {
    const [context, def] = this.props.children;
    return (
      <Fragment>
        <PopupContext popupId={this.id}>
          {context}
        </PopupContext>
        <PopupDef id={this.id}>
          {({
            closePopup,
            contextRef,
            isOpen,
            scrollableParents,
          }) => (
            isOpen && <PopupContainer
              anchor={this.props.anchor}
              className={this.props.className}
              contextRef={contextRef}
              closePopup={closePopup}
              offset={this.props.offset}
              scrollableParents={scrollableParents}
              style={this.props.style}
            >
              {def}
            </PopupContainer>
          )}
        </PopupDef>
      </Fragment>
    );
  }
}
