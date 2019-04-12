import React, { cloneElement } from 'react';
import { storiesOf } from '@storybook/react';
import { Transition, animated } from 'react-spring/renderprops';
import { Modal, Popup } from '../src';

const Button = ({ contextRef, open }) => (
	<button onClick={open} ref={contextRef}>
		Open
	</button>
);

export const Appear = ({ children, isOpen }) => (
  <Transition
    enter={{ opacity: 1 }}
    from={{ opacity: 0 }}
    items={isOpen}
    leave={{ opacity: 0 }}
    native
  >
    {isOpen => (isOpen && (style =>
      cloneElement(children, {
        as: animated.div,
        style
      })
    ))}
  </Transition>
);

const InnerPopup = ({ close }) => (
	<div>
		My popup
		<button onClick={close}>Close</button>
	</div>
);

const MyModal = ({ close }) => (
	<div>
		My modal
		<button onClick={close}>Close</button>
		<Popup anchor="right" animation={Appear} context={Button} offset={10} shouldCenterToContext>
			{InnerPopup}
		</Popup>
	</div>
);

storiesOf('Modal', module)
  .add('blank', () => <div />)
	.add('modal', () => (
    <Modal
      context={({ open }) => <button onClick={open}>Open Modal</button>}
    >
      {MyModal}
    </Modal>
  ))
  .add('modal with animation', () => (
    <Modal
      animation={Appear}
      context={({ open }) => <button onClick={open}>Open Modal</button>}
    >
      {MyModal}
    </Modal>
  ));
