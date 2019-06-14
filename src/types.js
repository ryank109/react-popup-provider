// @flow
export type Anchor = 'bottom' | 'left' | 'right' | 'top';

export type GenericFunc = () => void;

export type ContextRef = { current: null | React$ElementRef<any> };

export type ProviderValue = {
  close: GenericFunc,
  contextRef: ContextRef,
  isOpen: boolean,
  open: GenericFunc,
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
  close: GenericFunc,
  contextRef: ContextRef,
  isOpen: boolean,
  offset: number,
  root: HTMLElement,
  shouldCenterToContext: boolean,
  style?: { [string]: any },
};

export type BaseProps = {
  anchor: Anchor,
  animation: React$ElementType,
  children: ContainerArgs => React$Node,
  className?: string,
  container: React$ElementType,
  context: ProviderValue => React$Node,
  isOpen?: boolean,
  offset: number,
  overlay?: ({ isOpen: boolean }) => React$Node,
  root: HTMLElement,
  shouldCenterToContext: boolean,
  style?: { [string]: any },
};
