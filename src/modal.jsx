// @flow
import React from 'react';
import Base from './base';
import ModalContainer from './modal-container';

import type { BaseProps } from './types';

const Modal = (props: BaseProps) => (
  <Base
    {...props}
    container={ModalContainer}
  />
);

Modal.displayName = 'Modal';

export default Modal;
