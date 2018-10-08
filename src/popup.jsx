// @flow
import React, { Fragment, PureComponent } from 'react';
import { createPortal } from 'react-dom';
import { PopupContext } from './context';
import { Consumer } from './provider';
import { getPopupPosition } from './utils';

import type {
  Anchor,
  PopupContainerProps,
  PopupDefArgs,
  PopupDefProps,
  PopupProps,
} from './types';

type PopupContainerState = {
  left: number,
  top: number,
};

function stopEvent(event) {
  event.stopPropagation();
}

export class PopupContainer extends PureComponent<PopupContainerProps, PopupContainerState> {
  static defaultProps: {};

  parentEl: HTMLElement;
  el: ?HTMLElement;
  updatePosition: Function;

  constructor(props: PopupContainerProps) {
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
    const {
      anchor,
      clientRect,
      offset,
    } = this.props;
    if (this.el && clientRect) {
      const popupRect = this.el.getBoundingClientRect();
      this.setState(getPopupPosition(
        anchor,
        clientRect,
        popupRect.width,
        popupRect.height,
        global.innerWidth,
        global.innerHeight,
        offset,
      ));
    }
  }

  componentDidMount() {
    if (document.body) {
      document.body.appendChild(this.parentEl);
    }

    this.computeAndSetPosition();
    global.addEventListener('mouseup', this.props.closePopup);
    global.addEventListener('resize', this.updatePosition);
    this.props.scrollableParents.forEach(
      parentElem => parentElem.addEventListener('scroll', this.updatePosition));
  }

  componentWillUnmount() {
    this.props.closePopup();
    if (document.body) {
      document.body.removeChild(this.parentEl);
    }
    global.removeEventListener('mouseup', this.props.closePopup);
    global.removeEventListener('resize', this.updatePosition);
    this.props.scrollableParents.forEach(
      parentElem => parentElem.removeEventListener('scroll', this.updatePosition));
  }

  render() {
    const style = {
      position: 'absolute',
      ...this.state,
      ...this.props.style,
    }
    return createPortal(
      <div
        className={this.props.className}
        onMouseUp={stopEvent}
        ref={ el => { this.el = el; }}
        style={style}
      >
        {this.props.children({
          contextClientRect: this.props.clientRect,
          closePopup: this.props.closePopup,
        })}
      </div>,
      this.parentEl,
    );
  }
};

PopupContainer.defaultProps = {
  anchor: 'bottom',
  offset: 0,
};

export const PopupDef = (props: PopupDefProps) => (
  <Consumer>
    {({
      getClosePopupHandler,
      popupStateMap,
    }) => {
      const isOpen = !!popupStateMap[props.id];
      const { clientRect, scrollableParents = [] } = popupStateMap[props.id] || {};
      return props.children({
        closePopup: getClosePopupHandler(props.id),
        contextClientRect: clientRect,
        isOpen,
        scrollableParents: scrollableParents,
      });
    }}
  </Consumer>
);

export class Popup extends PureComponent<PopupProps> {
  id: string;

  constructor(props: PopupProps) {
    super(props);
    this.id = props.id || Math.random().toString(36).substr(2);
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
            contextClientRect,
            isOpen,
            scrollableParents,
          }) => (
            isOpen && <PopupContainer
              anchor={this.props.anchor}
              className={this.props.className}
              clientRect={contextClientRect}
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
