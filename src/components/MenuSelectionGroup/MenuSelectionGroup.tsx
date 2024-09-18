/* eslint-disable @typescript-eslint/ban-types */

import React, { ReactElement, useEffect, useMemo } from 'react';

import { STYLE } from './MenuSelectionGroup.constants';
import { MenuSelectionGroupAppearanceContextValue, Props } from './MenuSelectionGroup.types';
import './MenuSelectionGroup.style.scss';
import MenuItem from '../MenuItem';
import { SelectionManager, useMultipleSelectionState } from '@react-stately/selection';
import { useMenuSection } from '@react-aria/menu';

export const MenuSelectionGroupAppearanceContext = React.createContext<MenuSelectionGroupAppearanceContextValue>({});

const MenuSelectionGroup = <T extends object>(props: Props<T>): ReactElement => {
  const { item, state, onAction, tickPosition, classNameWhenSelected } = props;

  const { collection: tree, selectionManager: menuSelectionManager } = state;

  const selectionState = useMultipleSelectionState(props);

  const selectionManager = useMemo(
    () => new SelectionManager(tree, selectionState),
    [tree, selectionState]
  );

  const newState = {
    ...state,
    selectionManager,
  };

  useEffect(() => {
    menuSelectionManager.setFocusedKey(selectionManager.focusedKey);
  }, [selectionManager.focusedKey]);

  useEffect(() => {
    selectionManager.setFocused(menuSelectionManager.isFocused);
    selectionManager.setFocusedKey(menuSelectionManager.focusedKey);
  }, [menuSelectionManager.focusedKey, menuSelectionManager.isFocused]);

  const { itemProps, headingProps, groupProps } = useMenuSection({
    heading: item.rendered,
    'aria-label': item['aria-label'],
  });

  return (
    <MenuSelectionGroupAppearanceContext.Provider value={{ tickPosition, classNameWhenSelected }}>
    <div {...itemProps}>
      {!React.isValidElement(item.rendered) && item.rendered ? (
        <span className={STYLE.header} {...headingProps}>
          {item.rendered}
        </span>
      ) : (
        item.rendered && React.cloneElement(item.rendered as ReactElement, { ...headingProps })
      )}
      <ul {...groupProps} className={STYLE.wrapper}>
        {Array.from(item.childNodes).map((node) => {
          let item = (<MenuItem key={node.key} item={node} state={newState} onAction={onAction} />);

          if (node.wrapper) {
            item = node.wrapper(item);
          }

          return item;
        })}
      </ul>
    </div>
    </MenuSelectionGroupAppearanceContext.Provider>
  );
};

export default MenuSelectionGroup;
