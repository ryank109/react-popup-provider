// @flow
import type { Anchor } from './types';

const preMountedMap: { [any]: boolean } = {};

export function hasBeenPreMounted(container: any) {
  return preMountedMap[container];
}

export function togglePreMountedFlag(container: any) {
  if (!preMountedMap.hasOwnProperty(container)) {
    preMountedMap[container] = true;
  } else {
    delete preMountedMap[container];
  }
}

export function getOffsetPosition(
  position: number,
  offset: number,
) {
  return position + offset;
}

export function getNegativeOffsetPosition(
  position: number,
  offset: number,
  popupWidth: number,
) {
  return position - offset - popupWidth;
}

export function adjustPosition(
  windowSize: number,
  popupSize: number,
  ceiling: number,
  floor: number,
) {
  return (ceiling + popupSize > windowSize && floor - popupSize >= 0)
    ? floor - popupSize : ceiling;
}

export function calculatePosition(
  windowSize: number,
  popupSize: number,
  ceiling: number,
  floor: number,
  offset: number,
  shouldMatchPositive: boolean,
) {
  const offsetPosition = getOffsetPosition(floor, offset);
  const offsetNegativePosition = getNegativeOffsetPosition(ceiling, offset, popupSize);
  if (shouldMatchPositive) {
    return (offsetPosition + popupSize > windowSize && offsetNegativePosition >= 0)
      ? offsetNegativePosition : offsetPosition;
  }

  return (offsetNegativePosition < 0 && offsetPosition + popupSize <= windowSize)
    ? offsetPosition : offsetNegativePosition;
}

export function getPopupPosition(
  anchor: Anchor,
  rect: ClientRect,
  popupWidth: number,
  popupHeight: number,
  windowWidth: number,
  windowHeight: number,
  offset: number,
): { left: number, top: number } {
  switch (anchor) {
  case 'bottom':
  case 'top':
    return {
      left: adjustPosition(
        windowWidth,
        popupWidth,
        rect.left,
        rect.right) + window.pageXOffset,
      top: calculatePosition(
        windowHeight,
        popupHeight,
        rect.top,
        rect.bottom,
        offset,
        anchor === 'bottom') + window.pageYOffset,
    };
  default: // left and right
    return {
      left: calculatePosition(
        windowWidth,
        popupWidth,
        rect.left,
        rect.right,
        offset,
        anchor === 'right') + window.pageXOffset,
      top: adjustPosition(
        windowHeight,
        popupHeight,
        rect.top,
        rect.bottom) + window.pageYOffset,
    };
  }
}

export function getScrollableParent(elem: Element): ?Element {
  const overflowY = window.getComputedStyle(elem).overflowY;
  const isScrollable = overflowY !== 'visible' && overflowY !== 'hidden';
  if (isScrollable && elem.scrollHeight >= elem.clientHeight) {
    return elem;
  } else {
    return elem.parentElement
      ? getScrollableParent(elem.parentElement)
      : null;
  }
}

export function getAllScrollableParents(fromElem: Element): Array<Element> {
  const scrollableParents = [];
  let parentElem = fromElem.parentElement;
  while (parentElem) {
    parentElem = getScrollableParent(parentElem);
    if (parentElem) {
      scrollableParents.push(parentElem);
      parentElem = parentElem.parentElement;
    }
  }
  return scrollableParents;
}

export function getRandomId(): string {
  return process.env.NODE_ENV === 'test'
    ? 'test_id'
    : Math.random().toString(36).substr(2);
}
