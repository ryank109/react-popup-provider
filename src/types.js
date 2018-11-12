// @flow
export type Anchor = 'bottom' | 'left' | 'right' | 'top';

type GenericFunc = () => void;

export type CloseModal = GenericFunc;
export type ClosePopup = GenericFunc;
export type OpenModal = GenericFunc;
export type OpenPopup = GenericFunc;
export type ContextRef = { current: null | React$ElementRef<any> };

export type ProviderValue = {
  createContextRef: string => ContextRef,
  getClosePopupHandler: string => ClosePopup,
  getOpenPopupHandler: string => OpenPopup,
  popupStateMap: {
    [string]: {
      contextRef?: Element,
      scrollableParents?: Array<Element>,
    },
  },
  removeContextRef: string => void,
};

export type PopupContainerArgs = {
  closePopup: ClosePopup,
  contextClientRect?: ClientRect,
};

export type PopupContainerProps = {
  anchor: Anchor,
  as: React$ElementType,
  children: PopupContainerArgs => React$Node,
  className?: string,
  contextRef?: Element,
  closePopup: ClosePopup,
  id?: string,
  offset: number,
  root: HTMLElement,
  scrollableParents: Array<Element>,
  style?: { [string]: any },
  willBePreMounted: boolean,
};

export type PopupDefArgs = {
  closePopup: ClosePopup,
  contextRef?: Element,
  isOpen: boolean,
  scrollableParents: Array<Element>,
};

export type PopupDefProps = {
  children: PopupDefArgs => React$Node,
  id: string,
};

export type PopupContextArgs = {
  closePopup: ClosePopup,
  contextRef: ContextRef,
  isOpen: boolean,
  openPopup: OpenPopup,
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
  closeModal: CloseModal,
  isOpen: boolean,
  openModal: OpenModal,
};

export type ModalContextProps = {
  children: ModalContextArgs => React$Node,
  modalId: string,
};

export type ModalDefArgs = {
  closeModal: CloseModal,
  isOpen: boolean,
};

export type ModalContainerArgs = {
  closeModal: CloseModal,
};

export type ModalContainerProps = {
  as: React$ElementType,
  children: ModalContainerArgs => React$Node,
  className?: string,
  closeModal: CloseModal,
  id?: string,
  root: HTMLElement,
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
