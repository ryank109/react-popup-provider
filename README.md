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
  <Popup>
    {({
      contextRef,
      openPopup,
    }) => (
      <button ref={contextRef} onClick={openPopup}>Open</button>
    )}
    {({
      closePopup,
    }) => (
      <div>
        My popup
        <button onClick={closePopup}>Close</button>
      </div>
    )}
  </Popup>
</SomeView>
```

##### More Control
```javascript
// some-view.js
import { PopupContext, PopupContainer, PopupDef } from 'react-popup-provider';
<SomeView>
  <PopupContext popupId="my-popup">
    {({ contextRef, openPopup }) => (
      <div>
        <div ref={contextRef}>
        <button onClick={openPopup}>Open on Div</button>
      </div>
    )}
  </PopupContext>
  <PopupDef id="my-popup">
    {({
      contextClientRect,
      closePopup,
      isOpen,
      scrollableParents,
    }) => (
      <SomeAnimation>
        {
          isOpen
          && <PopupContainer
            clientRect={contextClientRect}
            closePopup={closePopup}
            scrollableParents={scrollableParents}
          >
            {props.children}
          </PopupContainer>
        }
      </SomeAnimation>
    )}
  </Consumer>
</SomeView>
```


### APIs

##### PopupProvider
Wrap it once or wrap it before you use Popup or Modal.

##### Modal

 * **Modal** - Simple compound component that hides the ModalContainer, ModalContext, and ModalDef. This is an example of what you can do with the other components.
 * **ModalContainer** - container that renders to portal
   * `as`: `React$ElementType` - defaults to `div`. Container's root element.
   * `children`: `ModalContainerArgs => React$Node`
   * `className`: `string`
   * `closeModal`: `CloseModal` - Close modal function callback.
   * `id`: `string` - Required.
   * `root`: `HTMLElement` - Portal element. Defaults to `<body>`
   * `style`: `{ [string]: any }`
   * `willBePreMounted`: `boolean` - This was really for react-spring's animation to `auto` height/width option, not sure if react-spring still works with `auto`.
 * **ModalContext** - context for Modal
   * `children`: `{ closeModal, isOpen, openModal } => <Button />`
   * `modalId`: `string` - Must match with ModalDef's id.
 * **ModalDef** - modal definition
   * `children`: `({ closeModal, isOpen }) => (isOpen && <TheView />)`
   * `id`: `string` - Must match with ModalContext's id.
 
##### Popup

 * **Popup** - Simple compound component that hides the PopupContainer, PopupContext, and PopupDef. This is an example of what you can do with the other components.
   * `anchor`: `top | bottom | left | right`
   * `children`: `PopupDefArgs => [PopupContextArgs => React$Node, PopupContainerArgs => React$Node]`
   * `className`: `string`
   * `offset`: `number` - Offset in pixels from the anchored position
   * `style`: `{ [string]: any }`
 * **PopupContainer** - container that renders to portal and has logic to reposition
   * `anchor`: `top | bottom | left | right`
   * `as`: `React$ElementType` - Defaults to `div`. Container's root element.
   * `children`: `PopupContainerArgs => React$Node`
   * `className`: `string`
   * `contextRef`: `Element` - Reference to the popup context from the provider.
   * `closePopup`: `ClosePopup` - Close popup callback function.
   * `id`: `string` - Required id.
   * `offset`: `number` - Offset in pixels from the anchored position
   * `root`: `HTMLElement` - Portal element, defaults to `<body>`
   * `scrollableParents`: `Array<Element>` - List of scrollable parents from the provider.
   * `style`: `{ [string]: any }`
   * `willBePreMounted`: `boolean` - This was really for react-spring's animation to `auto` height/width option, not sure if react-spring still works with `auto`.
 * **PopupContext** - context for Popup (i.e Button that opens the popup ref must be assigned to the Button)
   * `children` - `({ contextRef, openPopup }) => (<button ref={contextRef} onClick={openPopup}>...</button>)`
   * `popupId`: `string` - Required, must match with PopupDef's `id`
 * **PopupDef** - popup definition
   * `children`: `({ closePopup, contextRef, isOpen, scrollableParents }) => (isOpen && <TheView />)`
   * `id`: `sting` - Required, must match with PopupContext's `id`


### What's Next?
 * Eliminate the necessity of `id` by requiring one provider per Modal or Popup. This will simplify some internal logic as well.
