# react-popup-provider

### Usage

```javascript
import React from 'react';
import { Popup } from 'react-popup-provider';

<Popup
  context={({
    contextRef,
    open,
  }) => (
    <button ref={contextRef} onClick={open}>Open</button>
  )}
>
  {() => <div>My popup</div>}
</Popup>
```

```javascript
import React from 'react';
import { Modal } from 'react-popup-provider';

<Modal
  context={({ open }) => (
    <button onClick={open}>Open Modal</button>
  )}
>
  {({ close }) => (
    <div>
      <span>My Modal</span>
      <button onClick={close}>Close</button>
    </div>
  )}
</Modal>
```

##### With Animation (react-spring)
```javascript
// Modal works the same way
import React, { cloneElement } from 'react';
import { Popup } from 'react-popup-provider';
import { Transition } from 'react-spring';

const Appear = ({ children, isOpen }) => (
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


<Popup
  animation={Appear}
  context={({
    contextRef,
    open,
  }) => (
    <button ref={contextRef} onClick={open}>Open</button>
  )}
>
  {() => <div>My popup</div>}
</Popup>
```


### APIs

##### Modal
 * `animation`: `React$ElementType` - defaults to `Tada` effect. Which is just show when `isOpen` is `true`.
 * `children`: `({ close, left, top }) => React$Node`
 * `className`: `string`
 * `close`: `() => void` - Close function callback.
 * `context`: `({ close, contextRef, isOpen, open, scrollableParents }) => React$Node`
 * `overlay`: `({ isOpen }) => React$Node` - optional overlay element that renders to `root`.  Use this if you want to control overlay's animation that doesn't get affected by the modal's animation
 * `root`: `HTMLElement` - defaults to `document.body`.  This is where the portal is created.
 * `style`: `object` - optional styles for the modal container


##### Popup
 * `anchor`: `top | bottom | left | right`
 * `animation`: `React$ElementType` - defaults to `Tada` effect. Which is just show when `isOpen` is `true`.
 * `children`: `({ close, left, top }) => React$Node`
 * `className`: `string`
 * `close`: `() => void` - Close function callback.
 * `context`: `({ close, contextRef, isOpen, open, scrollableParents }) => React$Node`
 * `offset`: `number` - Offset in pixels from the anchored position
 * `root`: `HTMLElement` - defaults to `document.body`.  This is where the portal is created.
 * `shouldCenterToContext`: `boolean` - Shows the popup center to the context, if true.  Defaults to false.
 * `style`: `object` - optional styles for the popup container
