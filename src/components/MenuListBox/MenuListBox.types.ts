import { CSSProperties, ReactNode } from 'react';

import { SelectDirection } from '../Select';

export interface Props {
  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;
  /**
   * children props
   */
  children?: ReactNode;
  direction?: SelectDirection;
}
