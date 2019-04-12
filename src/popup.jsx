// @flow
import React from 'react';
import Base from './base';
import PopupContainer from './popup-container';

import type { BaseProps } from './types';

const Popup = (props: BaseProps) => (
  <Base
    {...props}
    container={PopupContainer}
  />
);

Popup.displayName = 'Popup';

export default Popup;
