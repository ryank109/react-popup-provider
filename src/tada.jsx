// @flow
import React, { Fragment } from 'react';

import type { AnimationProps } from './types';

const Tada = ({ children, isOpen }: AnimationProps) => <Fragment>{isOpen && children}</Fragment>;

Tada.displayName = 'TadaEffect';

export default Tada;
