// @flow
import React, { Fragment } from 'react';
import { createPortal } from 'react-dom';
import { Consumer, PopupProvider } from './provider';
import Tada from './tada';

import type { BaseProps } from './types';

const Base = (props: BaseProps) => (
  <PopupProvider isOpen={props.isOpen}>
    <Consumer>
      {props.context}
    </Consumer>
    <Consumer>
      {({
        close,
        contextRef,
        isOpen,
      }) => (
        <Fragment>
          {props.overlay && createPortal(props.overlay({ isOpen }), props.root)}
          <props.animation isOpen={isOpen}>
            <props.container
              anchor={props.anchor}
              className={props.className}
              contextRef={contextRef}
              close={close}
              isOpen={isOpen}
              offset={props.offset}
              root={props.root}
              shouldCenterToContext={props.shouldCenterToContext}
            >
              {props.children}
            </props.container>
          </props.animation>
        </Fragment>
      )}
    </Consumer>
  </PopupProvider>
);

Base.defaultProps = {
  animation: Tada,
  root: document.body || document.createElement('div'),
};

Base.displayName = 'PopupBase';

export default Base;
