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

 * Modal - Simple compound component that hides the ModalContainer, ModalContext, and ModalDef. Example for more advanced things.
 * ModalContainer - container that renders to portal
   * as: React$ElementType
   * children: ModalContainerArgs => React$Node
   * className?: string
   * closeModal: CloseModal
   * id?: string
   * root: HTMLElement
   * style?: { [string]: any }
   * willBePreMounted: boolean - this was really for react-spring's animation to `auto` size option (not sure if it still works...)
 * ModalContext - context for Modal
 * ModalDef - `({ closeModal, isOpen }) => (isOpen && <TheView />)`
 
##### Popup

 * Popup - Simple compound component that hides the PopupContainer, PopupContext, and PopupDef. Example for more advanced things.
   * anchor: `top | bottom | left | right`
   * children: PopupDefArgs => [PopupContextArgs => React$Node, PopupContainerArgs => React$Node]
   * className?: string
   * offset: number
   * style?: { [string]: any }
 * PopupContainer - container that renders to portal and has logic to reposition
   * anchor: `top | bottom | left | right`
   * as: React$ElementType
   * children: PopupContainerArgs => React$Node
   * className?: string
   * contextRef?: Element
   * closePopup: ClosePopup
   * id?: string
   * offset: number
   * root: HTMLElement - where to render the portal, defaults to `<body>`
   * scrollableParents: Array<Element> - pass from the context args
   * style?: { [string]: any }
   * willBePreMounted: boolean - this was really for react-spring's animation to `auto` size option (not sure if it still works...)
 * PopupContext - context for Popup (i.e Button that opens the popup ref must be assigned to the Button) `({ contextRef, openPopup }) => (<button ref={contextRef} onClick={openPopup}>...</button>)`
 * PopupDef - `({ closePopup, contextRef, isOpen, scrollableParents }) => (isOpen && <TheView />)`
