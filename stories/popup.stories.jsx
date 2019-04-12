import React from 'react';
import { storiesOf } from '@storybook/react';
import { Popup } from '../src';
import { Appear } from './modal.stories';

const PopupContext = ({ contextRef, open }) => <button onClick={open} ref={contextRef}>Open Popup</button>;

const MyPopup = () => (
	<div>
		My popup
	</div>
);

storiesOf('Popup', module)
  .add('blank', () => <div />)
	.add('popup', () => (
    <Popup
      context={PopupContext}
    >
      {MyPopup}
    </Popup>
  ))
  .add('animated popup', () => (
    <Popup
      animation={Appear}
      context={PopupContext}
    >
      {MyPopup}
    </Popup>
  ));
