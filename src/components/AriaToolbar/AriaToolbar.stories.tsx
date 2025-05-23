import React from 'react';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import AriaToolbar, { AriaToolbarProps } from './';
import Documentation from './AriaToolbar.stories.docs.mdx';
import ButtonCircle from '../ButtonCircle';
import ButtonPill from '../ButtonPill';
import ButtonSimple from '../ButtonSimple';
import Popover from '../Popover';
import ButtonCircleToggle from '../ButtonCircleToggle';

import argTypes from './AriaToolbar.stories.args';
import { Props } from './AriaToolbar.types';
import AriaToolbarItem from '../AriaToolbarItem';
import { Template } from '../../storybook/helper.stories.templates';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Momentum UI/AriaToolbar',
  component: AriaToolbar,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const onPressHandler = () => {
  const input: HTMLInputElement = document.getElementById('textInput') as HTMLInputElement;
  input.value = input.value + 'a';
};

const Horizontal = (props: Partial<Props>) => {
  return (
    <>
      <AriaToolbar
        aria-label="toolbar 1"
        aria-controls="textInput"
        style={{ display: 'flex', columnGap: '0.5rem', marginBottom: '1rem' }}
        ariaToolbarItemsSize={3}
        {...props}
      >
        <AriaToolbarItem itemIndex={0}>
          <ButtonPill onPress={onPressHandler}>Item 1</ButtonPill>
        </AriaToolbarItem>
        <AriaToolbarItem itemIndex={1}>
          <ButtonCircle onClick={onPressHandler}>2</ButtonCircle>
        </AriaToolbarItem>
        <AriaToolbarItem itemIndex={2}>
          <ButtonCircle onClick={onPressHandler}>3</ButtonCircle>
        </AriaToolbarItem>
      </AriaToolbar>
      <input type="text" id="textInput" aria-label="A text input" />
    </>
  );
};

Horizontal.argTypes = argTypes;

const Vertical = () => {
  return (
    <>
      <AriaToolbar
        orientation="vertical"
        aria-controls="textInput"
        aria-label="toolbar 1"
        style={{ display: 'flex', rowGap: '0.5rem', flexDirection: 'column' }}
        ariaToolbarItemsSize={3}
      >
        <AriaToolbarItem itemIndex={0}>
          <ButtonCircle onClick={onPressHandler}>1</ButtonCircle>
        </AriaToolbarItem>

        <AriaToolbarItem itemIndex={1}>
          <ButtonCircle onClick={onPressHandler}>2</ButtonCircle>
        </AriaToolbarItem>

        <AriaToolbarItem itemIndex={2}>
          <ButtonCircle onClick={onPressHandler}>3</ButtonCircle>
        </AriaToolbarItem>
      </AriaToolbar>
      <AriaToolbar
        orientation="vertical"
        aria-controls="textInput"
        aria-label="toolbar 2"
        style={{
          display: 'flex',
          rowGap: '0.5rem',
          flexDirection: 'column',
          marginTop: '1rem',
          marginBottom: '1rem',
        }}
        ariaToolbarItemsSize={3}
      >
        <AriaToolbarItem itemIndex={0}>
          <ButtonCircle onClick={onPressHandler}>1</ButtonCircle>
        </AriaToolbarItem>

        <AriaToolbarItem itemIndex={1}>
          <ButtonCircle onClick={onPressHandler}>2</ButtonCircle>
        </AriaToolbarItem>

        <AriaToolbarItem itemIndex={2}>
          <ButtonCircle onClick={onPressHandler}>3</ButtonCircle>
        </AriaToolbarItem>
      </AriaToolbar>
      <input type="text" id="textInput" aria-label="A text input" />
    </>
  );
};

const WithinPopover = () => {
  return (
    <>
      <Popover
        trigger="click"
        interactive
        triggerComponent={
          <ButtonSimple style={{ margin: '10rem auto', display: 'flex' }}>Click me!</ButtonSimple>
        }
      >
        <AriaToolbar
          orientation="vertical"
          aria-controls="textInput"
          aria-label="toolbar 1"
          style={{ display: 'flex', rowGap: '0.5rem', flexDirection: 'column' }}
          ariaToolbarItemsSize={3}
        >
          <AriaToolbarItem itemIndex={0}>
            <ButtonCircle onClick={onPressHandler}>1</ButtonCircle>
          </AriaToolbarItem>

          <AriaToolbarItem itemIndex={1}>
            <ButtonCircle onClick={onPressHandler}>2</ButtonCircle>
          </AriaToolbarItem>

          <AriaToolbarItem itemIndex={2}>
            <ButtonCircle onClick={onPressHandler}>3</ButtonCircle>
          </AriaToolbarItem>
        </AriaToolbar>
        <AriaToolbar
          orientation="vertical"
          aria-controls="textInput"
          aria-label="toolbar 2"
          style={{
            display: 'flex',
            rowGap: '0.5rem',
            flexDirection: 'column',
            marginTop: '1rem',
            marginBottom: '1rem',
          }}
          ariaToolbarItemsSize={3}
        >
          <AriaToolbarItem itemIndex={0}>
            <ButtonCircle onClick={onPressHandler}>1</ButtonCircle>
          </AriaToolbarItem>

          <AriaToolbarItem itemIndex={1}>
            <ButtonCircle onClick={onPressHandler}>2</ButtonCircle>
          </AriaToolbarItem>

          <AriaToolbarItem itemIndex={2}>
            <ButtonCircle onClick={onPressHandler}>3</ButtonCircle>
          </AriaToolbarItem>
        </AriaToolbar>
      </Popover>
      <input type="text" id="textInput" aria-label="A text input" />
    </>
  );
};

const IncludesPopoverAndTooltips = () => {
  return (
    <>
      <AriaToolbar
        orientation="vertical"
        aria-controls="textInput"
        aria-label="toolbar 1"
        style={{ display: 'flex', rowGap: '0.5rem', flexDirection: 'column' }}
        ariaToolbarItemsSize={3}
      >
        <Popover
          trigger="mouseenter focus"
          triggerComponent={
            <AriaToolbarItem itemIndex={0}>
              <ButtonCircle onClick={onPressHandler}>1</ButtonCircle>
            </AriaToolbarItem>
          }
        >
          This is some content.
        </Popover>

        <AriaToolbarItem itemIndex={1}>
          <ButtonCircle onClick={onPressHandler}>2</ButtonCircle>
        </AriaToolbarItem>

        <AriaToolbarItem itemIndex={2}>
          <ButtonCircle onClick={onPressHandler}>3</ButtonCircle>
        </AriaToolbarItem>
      </AriaToolbar>
      <input type="text" id="textInput" aria-label="A text input" />
    </>
  );
};

IncludesPopoverAndTooltips.argTypes = argTypes;

const RenderedAsButtonGroup = Template<AriaToolbarProps>(AriaToolbar).bind({});

RenderedAsButtonGroup.argTypes = { ...argTypes };
RenderedAsButtonGroup.args = {
  ariaToolbarItemsSize: 3,
  orientation: 'horizontal',
  ariaLabel: 'Example aria toolbar rendered as button group.',
  shouldRenderAsButtonGroup: true,
  buttonGroupProps: {
    round: true,
    separator: true,
  },
  children: [
    <AriaToolbarItem itemIndex={0} key={'item 0'}>
      <ButtonCircle onClick={action('press item 0')}>1</ButtonCircle>
    </AriaToolbarItem>,
    <AriaToolbarItem itemIndex={1} key={'item 1'}>
      <ButtonCircle onClick={action('press item 1')}>2</ButtonCircle>
    </AriaToolbarItem>,
    <AriaToolbarItem itemIndex={2} key={'item 2'}>
      <ButtonCircle onClick={action('press item 2')}>3</ButtonCircle>
    </AriaToolbarItem>,
  ],
};

const WithButtonCircleToggles = () => {
  return (
    <>
      <AriaToolbar
        orientation="vertical"
        aria-controls="textInput"
        aria-label="toolbar 1"
        style={{ display: 'flex', rowGap: '0.5rem', flexDirection: 'column' }}
        ariaToolbarItemsSize={3}
      >
        <AriaToolbarItem itemIndex={0}>
          <ButtonCircleToggle onChange={onPressHandler}>1</ButtonCircleToggle>
        </AriaToolbarItem>

        <AriaToolbarItem itemIndex={1}>
          <ButtonCircleToggle onChange={onPressHandler}>2</ButtonCircleToggle>
        </AriaToolbarItem>

        <AriaToolbarItem itemIndex={2}>
          <ButtonCircleToggle onChange={onPressHandler}>3</ButtonCircleToggle>
        </AriaToolbarItem>
      </AriaToolbar>
      <AriaToolbar
        orientation="vertical"
        aria-controls="textInput"
        aria-label="toolbar 2"
        style={{
          display: 'flex',
          rowGap: '0.5rem',
          flexDirection: 'column',
          marginTop: '1rem',
          marginBottom: '1rem',
        }}
        ariaToolbarItemsSize={3}
      >
        <AriaToolbarItem itemIndex={0}>
          <ButtonCircleToggle onChange={onPressHandler}>1</ButtonCircleToggle>
        </AriaToolbarItem>

        <AriaToolbarItem itemIndex={1}>
          <ButtonCircleToggle onChange={onPressHandler}>2</ButtonCircleToggle>
        </AriaToolbarItem>

        <AriaToolbarItem itemIndex={2}>
          <ButtonCircleToggle onChange={onPressHandler}>3</ButtonCircleToggle>
        </AriaToolbarItem>
      </AriaToolbar>
      <input type="text" id="textInput" aria-label="A text input" />
    </>
  );
};

export {
  Horizontal,
  Vertical,
  WithinPopover,
  IncludesPopoverAndTooltips,
  RenderedAsButtonGroup,
  WithButtonCircleToggles,
};
