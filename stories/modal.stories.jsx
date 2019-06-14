import React, { cloneElement, useState } from 'react';
import styled from '@emotion/styled';
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

export const DropIn = ({ children, isOpen }) => (
  <Transition
    enter={{
      opacity: 1,
      transform: "translateY(0)"
    }}
    from={{
      opacity: 0,
      transform: "translateY(-100%)"
    }}
    items={isOpen}
    leave={{
      opacity: 0,
      transform: "translateY(-100%)"
    }}
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

const ControlledModal = () => {
  const [isOpen, setOpen] = useState(true);
  return (
    <Modal
      animation={Appear}
      context={() => <button onClick={() => setOpen(!isOpen)}>Toggle</button>}
      isOpen={isOpen}
    >
      {MyModal}
    </Modal>
  )
};

const StyledOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
`;

const Overlay = ({ isOpen }) => (
  <Appear
    isOpen={isOpen}
  >
    <StyledOverlay />
  </Appear>
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
  ))
  .add('modal with controlled', () => <ControlledModal />)
  .add('modal with overlay animation', () => (
    <Modal
      animation={DropIn}
      context={({ open }) => <button onClick={open}>Open Modal</button>}
      overlay={Overlay}
    >
      {MyModal}
    </Modal>
  ));
