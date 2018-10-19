// @flow
export type Anchor = 'bottom' | 'left' | 'right' | 'top';

export type ProviderValue = {
  createContextRef: string => { current: null | React$ElementRef<any> },
  getClosePopupHandler: string => () => void,
  getOpenPopupHandler: string => () => void,
  popupStateMap: {
    [string]: {
      contextRef?: Element,
      scrollableParents?: Array<Element>,
    },
  },
  removeContextRef: string => void,
};

export type PopupContainerArgs = {
  closePopup: () => void,
  contextClientRect?: ClientRect,
};

export type PopupContainerProps = {
  anchor: Anchor,
  as: React$ElementType,
  children: PopupContainerArgs => React$Node,
  className?: string,
  contextRef?: Element,
  closePopup: () => void,
  id?: string,
  offset: number,
  scrollableParents: Array<Element>,
  style?: { [string]: any },
  willBePreMounted: boolean,
};

export type PopupDefArgs = {
  closePopup: () => void,
  contextRef?: Element,
  isOpen: boolean,
  scrollableParents: Array<Element>,
};

export type PopupDefProps = {
  children: PopupDefArgs => React$Node,
  id: string,
};

export type PopupContextArgs = {
  contextRef: { current: null | React$ElementRef<any> },
  openPopup: () => void,
};

export type PopupContextProps = {
  children: PopupContextArgs => React$Node,
  popupId: string,
};

export type PopupProps = {
  anchor: Anchor,
  children: PopupDefArgs => [
    PopupContextArgs => React$Node,
    PopupContainerArgs => React$Node,
  ],
  className?: string,
  offset: number,
  style?: { [string]: any },
};

export type ModalContextArgs = {
  openModal: () => void,
};

export type ModalContextProps = {
  children: ModalContextArgs => React$Node,
  modalId: string,
};

export type ModalDefArgs = {
  closeModal: () => void,
  isOpen: boolean,
};

export type ModalContainerArgs = {
  closeModal: () => void,
};

export type ModalContainerProps = {
  as: React$ElementType,
  children: ModalContainerArgs => React$Node,
  className?: string,
  closeModal: () => void,
  id?: string,
  style?: { [string]: any },
  willBePreMounted: boolean,
};

export type ModalDefProps = {
  children: ModalDefArgs => React$Node,
  id: string,
};

export type ModalProps = {
  children: [
    ModalContextArgs => React$Node,
    ModalContainerArgs => React$Node,
  ],
  className?: string,
  style?: { [string]: any },
};
