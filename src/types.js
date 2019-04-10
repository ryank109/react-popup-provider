// @flow
export type Anchor = 'bottom' | 'left' | 'right' | 'top';

export type GenericFunc = () => void;

export type ContextRef = { current: null | React$ElementRef<any> };

export type ProviderValue = {
  close: GenericFunc,
  contextRef: ContextRef,
  isOpen: boolean,
  open: GenericFunc,
  scrollableParents: Array<Element>,
};

export type PopupContainerArgs = {
  close: GenericFunc,
  contextClientRect?: ClientRect,
  left: number,
  top: number,
};

export type PopupContainerProps = {
  anchor: Anchor,
  as: React$ElementType,
  children: PopupContainerArgs => React$Node,
  className?: string,
  contextRef: ContextRef,
  close: GenericFunc,
  offset: number,
  root: HTMLElement,
  scrollableParents: Array<Element>,
  shouldCenterToContext: boolean,
  style?: { [string]: any },
};

export type PopupProps = {
  as?: React$ElementType,
  anchor: Anchor,
  children: PopupContainerArgs => React$Node,
  context: ProviderValue => React$Node,
  className?: string,
  offset: number,
  shouldCenterToContext: boolean,
  style?: { [string]: any },
};

export type ModalContainerArgs = {
  close: GenericFunc,
  isOpen: boolean,
};

export type ModalContainerProps = {
  as: React$ElementType,
  children: ModalContainerArgs => React$Node,
  className?: string,
  close: GenericFunc,
  isOpen: boolean,
  root: HTMLElement,
  style?: { [string]: any },
};

export type ModalProps = {
  as?: React$ElementType,
  children: ModalContainerArgs => React$Node,
  context: ProviderValue => React$Node,
  className?: string,
  style?: { [string]: any },
};
