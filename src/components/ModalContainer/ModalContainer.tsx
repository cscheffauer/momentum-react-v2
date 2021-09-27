import React, { FC } from 'react';
import classnames from 'classnames';

import { DEFAULTS, STYLE } from './ModalContainer.constants';
import { Props } from './ModalContainer.types';
import './ModalContainer.style.scss';

/**
 * The ModalContainer component.
 */
const ModalContainer: FC<Props> = (props: Props) => {
  const { className, children, color, elevation, id, isPadded, isRounded, style } = props;

  return (
    <div
      className={classnames(className, STYLE.wrapper)}
      data-color={color || DEFAULTS.COLOR}
      data-elevation={elevation || DEFAULTS.ELEVATION}
      data-padded={isPadded}
      data-rounded={isRounded}
      id={id}
      style={style}
    >
      {children}
    </div>
  );
};

export default ModalContainer;