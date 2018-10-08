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
