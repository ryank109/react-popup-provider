import React from 'react';
import { storiesOf } from '@storybook/react';
import { Modal, Popup } from '../src';

const Button = ({ contextRef, open }) => <button onClick={open} ref={contextRef}>Open</button>;

const InnerPopup = ({ close }) => (
  <div>
    My popup
    <button onClick={close}>Close</button>
  </div>
);

const ModalDef = ({ close }) => (
  <div>
    My modal
    <button onClick={close}>Close</button>
    <Popup anchor="right" context={Button} offset={10} shouldCenterToContext>
      {InnerPopup}
    </Popup>
  </div>
);

storiesOf('Modal', module).add('modal', () => (
  <Modal context={({ open }) => <button onClick={open}>Open Modal</button>}>
    {ModalDef}
  </Modal>
)).add('blank', () => (<div />));
