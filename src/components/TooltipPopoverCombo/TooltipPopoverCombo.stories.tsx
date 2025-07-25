import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import TooltipPopoverCombo, { TooltipPopoverComboProps } from './';
import Documentation from './TooltipPopoverCombo.stories.docs.mdx';

import React, { useState } from 'react';

import { Story } from '@storybook/react';
import Text from '../Text';
import ButtonCircle from '../ButtonCircle';
import Icon from '../Icon';
import Menu from '../Menu';
import { Item } from '@react-stately/collections';
import { PopoverInstance } from '../Popover/Popover.types';
import ButtonPill from '../ButtonPill';

export default {
  title: 'Momentum UI/TooltipPopoverCombo',
  component: TooltipPopoverCombo,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example: Story<TooltipPopoverComboProps> = () => {
  const triggerComponent = (
    <ButtonCircle
      size={40}
      color="cancel"
      prefixIcon="cancel-bold"
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        margin: '10rem auto',
        display: 'flex',
      }}
      id="storybook-id-example"
    />
  );

  const [popoverInstance, setPopoverInstance] = useState<PopoverInstance>();

  const onItemPress = (key: string) => {
    switch (key) {
      default:
        popoverInstance?.hide();
    }
  };

  const popoverContent = (
    <Menu onAction={onItemPress} style={{ width: '15rem' }}>
      <Item key="option-1">Option 1</Item>
      <Item key="option-2">Option 2</Item>
    </Menu>
  );

  return (
    <TooltipPopoverCombo
      popoverContent={popoverContent}
      triggerComponent={triggerComponent}
      tooltipContent={<Text tagName="p">Press to show options</Text>}
      otherTooltipProps={{ placement: 'top' }}
      otherPopoverProps={{ placement: 'top', setInstance: setPopoverInstance }}
    />
  );
};

const AsDescription: Story<TooltipPopoverComboProps> = () => {
  const triggerComponent = (
    <ButtonPill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        margin: '10rem auto',
        display: 'flex',
      }}
      id="storybook-id-example"
    >
      <div style={{ gap: '0.5rem', display: 'flex', alignItems: 'center' }}>
        <Icon name="plus" scale={32} />
        <Text tagName="p">Create</Text>
      </div>
    </ButtonPill>
  );

  const [popoverInstance, setPopoverInstance] = useState<PopoverInstance>();

  const onItemPress = (key: string) => {
    switch (key) {
      default:
        popoverInstance?.hide();
    }
  };

  const popoverContent = (
    <Menu onAction={onItemPress} style={{ width: '15rem' }}>
      <Item key="option-1">
        <div style={{ gap: '0.5rem', display: 'flex', alignItems: 'center' }}>
          <Icon name="chat" scale={24} />
          <Text tagName="p">Space</Text>
        </div>
      </Item>
    </Menu>
  );

  return (
    <TooltipPopoverCombo
      popoverContent={popoverContent}
      triggerComponent={triggerComponent}
      tooltipContent={<Text tagName="p">Press to see options</Text>}
      otherTooltipProps={{ placement: 'top', type: 'description' }}
      otherPopoverProps={{ placement: 'top', setInstance: setPopoverInstance }}
    />
  );
};

export { Example, AsDescription };
