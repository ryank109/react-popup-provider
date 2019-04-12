// @flow
import React from 'react';
import { Consumer, PopupProvider } from './provider';
import Tada from './tada';

import type { BaseProps } from './types';

const Base = (props: BaseProps) => (
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
        <props.animation isOpen={isOpen}>
          <props.container
            anchor={props.anchor}
            className={props.className}
            contextRef={contextRef}
            close={close}
            offset={props.offset}
            scrollableParents={scrollableParents}
            shouldCenterToContext={props.shouldCenterToContext}
          >
            {props.children}
          </props.container>
        </props.animation>
      )}
    </Consumer>
  </PopupProvider>
);

Base.defaultProps = {
  animation: Tada,
};

Base.displayName = 'PopupBase';

export default Base;
