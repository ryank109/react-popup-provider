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

export type AnimationProps = {
  children: React$Node,
  isOpen: boolean,
};

export type ContainerArgs = {
  close: GenericFunc,
  contextClientRect?: ClientRect,
  left: number,
  top: number,
};

export type ContainerProps = {
  anchor: Anchor,
  as: React$ElementType,
  children: ContainerArgs => React$Node,
  className?: string,
  contextRef: ContextRef,
  close: GenericFunc,
  offset: number,
  root: HTMLElement,
  scrollableParents: Array<Element>,
  shouldCenterToContext: boolean,
  style?: { [string]: any },
};

export type BaseProps = {
  anchor: Anchor,
  animation: React$ElementType,
  children: ContainerArgs => React$Node,
  container: React$ElementType,
  context: ProviderValue => React$Node,
  className?: string,
  offset: number,
  shouldCenterToContext: boolean,
  style?: { [string]: any },
};
