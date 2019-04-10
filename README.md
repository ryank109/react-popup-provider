# react-popup-provider

### Usage

```javascript
// main.js
import { PopupProvider } from 'react-popup-provider';
<PopupProvider>
  <App/>
</PopupProvider>


// some-view.js
import { Popup } from 'react-popup-provider';
<SomeView>
  <Popup
    context={({
      contextRef,
      open,
    }) => (
      <button ref={contextRef} onClick={open}>Open</button>
    )}
  >
    {({
      close,
    }) => (
      <div>
        My popup
        <button onClick={close}>Close</button>
      </div>
    )}
  </Popup>
</SomeView>
```

##### More Control
```javascript
// some-view.js
import { Consumer, PopupProvider, PopupContainer } from 'react-popup-provider';
<PopupProvider>
  <Consumer>
    {({ contextRef, open }) => (
      <div>
        <div ref={contextRef}>
        <button onClick={open}>Open on Div</button>
      </div>
    )}
  </Consumer>
  <Consumer>
    {({
      contextRef,
      close,
      isOpen,
      scrollableParents,
    }) => (
      <SomeAnimation>
        {
          isOpen
          && <PopupContainer
            close={close}
            contextRef={contextRef}
            scrollableParents={scrollableParents}
          >
            {props.children}
          </PopupContainer>
        }
      </SomeAnimation>
    )}
  </Consumer>
</PopupProvider>
```


### APIs

##### PopupProvider
Context Provider.

##### Consumer
Context Consumer.

##### Modal

 * **Modal** - Simple compound component that hides the ModalContainer and context APIs. This is an example of what you can do with the other components.
   * `as`: `React$ElementType` - defaults to `div`. Container's root element.
   * `children`: `({ close, isOpen }) => React$Node`
   * `className`: `string`
   * `close`: `() => void` - Close function callback.
   * `context`: `({ close, contextRef, isOpen, open, scrollableParents }) => React$Node`
   * `root`: `HTMLElement` - Portal element. Defaults to `<body>`
   * `style`: `{ [string]: any }`
 * **ModalContainer** - container that renders to portal
   * `as`: `React$ElementType` - defaults to `div`. Container's root element.
   * `children`: `({ close, isOpen }) => React$Node`
   * `className`: `string`
   * `close`: `() => void` - Close function callback.
   * `root`: `HTMLElement` - Portal element. Defaults to `<body>`
   * `style`: `{ [string]: any }`

##### Popup

 * **Popup** - Simple compound component that hides the PopupContainer and context APIs. This is an example of what you can do with the other components.
   * `anchor`: `top | bottom | left | right`
   * `as`: `React$ElementType` - Container's root element. Defaults to `div`.
   * `children`: `({ close, contextClientRect, left, top, }) => React$Node`
   * `className`: `string`
   * `context`: `({ close, contextRef, isOpen, open, scrollableParents }) => React$Node`
   * `offset`: `number` - Offset in pixels from the anchored position
   * `shouldCenterToContext`: `boolean` - Shows the popup center to the context, if true.  Defaults to false.
   * `style`: `{ [string]: any }`
 * **PopupContainer** - container that renders to portal and has logic to reposition
   * `anchor`: `top | bottom | left | right`
   * `as`: `React$ElementType` - Defaults to `div`. Container's root element.
   * `children`: `({ close, contextClientRect, left, top, }) => React$Node`
   * `className`: `string`
   * `contextRef`: `Element` - Reference to the popup context from the provider.
   * `closePopup`: `ClosePopup` - Close popup callback function.
   * `offset`: `number` - Offset in pixels from the anchored position
   * `root`: `HTMLElement` - Portal element, defaults to `<body>`
   * `scrollableParents`: `Array<Element>` - List of scrollable parents from the provider.
   * `shouldCenterToContext`: `boolean` - Shows the popup center to the context, if true.  Defaults to false.
   * `style`: `{ [string]: any }`
