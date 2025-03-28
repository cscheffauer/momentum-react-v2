import React from 'react';
import { SSRProvider } from '@react-aria/ssr';

import { mountAndWait } from '../../../test/utils';
import Icon from '../Icon';
import SearchInput, { SEARCH_INPUT_CONSTANTS as CONSTANTS } from '.';
import { act } from 'react-dom/test-utils';
import ButtonSimple from '../ButtonSimple';
import { WARNINGS } from './SearchInput.constants';

const testTranslations = {
  empty: 'empty',
  nonempty: 'nonempty',
  filterAdded: 'filteradded',
  filterRemoved: 'filterremoved',
  text: 'text',
};

describe('<SearchInput />', () => {
  describe('snapshot', () => {
    const mountComponent = async (component) => {
      const container = await mountAndWait(<SSRProvider>{component}</SSRProvider>);
      return container;
    };

    it('should match snapshot', async () => {
      expect.assertions(1);

      const container = await mountComponent(
        <SearchInput aria-label="search" clearButtonAriaLabel="Clear" />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = await mountComponent(
        <SearchInput aria-label="search" className={className} clearButtonAriaLabel="Clear" />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = await mountComponent(
        <SearchInput aria-label="search" id={id} clearButtonAriaLabel="Clear" />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with a label', async () => {
      expect.assertions(1);

      const container = await mountComponent(
        <SearchInput label="search" aria-label="search" clearButtonAriaLabel="Clear" />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = await mountComponent(
        <SearchInput aria-label="search" style={style} clearButtonAriaLabel="Clear" />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when searching', async () => {
      expect.assertions(1);

      const container = await mountComponent(
        <SearchInput aria-label="search" searching={true} clearButtonAriaLabel="Clear" />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with height', async () => {
      expect.assertions(1);

      const container = await mountComponent(
        <SearchInput aria-label="search" height={28} clearButtonAriaLabel="Clear" />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when filters are set', async () => {
      expect.assertions(1);

      const container = await mountComponent(
        <SearchInput
          aria-label="search"
          value="From: someone"
          clearButtonAriaLabel="Clear"
          filters={[
            {
              term: 'from',
              value: 'Joe',
              translations: testTranslations,
            },
            {
              term: 'in',
              value: 'a space',
              translations: testTranslations,
            },
          ]}
        />
      );

      expect(container).toMatchSnapshot();
    });
    it('should match snapshot when isCombobox is true', async () => {
      expect.assertions(1);

      const container = await mountComponent(
        <SearchInput isCombobox={true} isComboboxExpanded={false} clearButtonAriaLabel="Clear" />
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', async () => {
      expect.assertions(1);

      const element = (
        await mountAndWait(<SearchInput aria-label="search" clearButtonAriaLabel="Clear" />)
      )
        .find(SearchInput)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = (
        await mountAndWait(
          <SearchInput aria-label="search" className={className} clearButtonAriaLabel="Clear" />
        )
      )
        .find(SearchInput)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('wrapper id should not be the same as the input id', async () => {
      expect.assertions(3);

      const wrapper = await mountAndWait(
        <SearchInput aria-label="search" clearButtonAriaLabel="Clear" />
      );

      const inputElement = wrapper.find('input');
      const parentElement = wrapper.getDOMNode();

      expect(parentElement.id).toBe('');
      expect(inputElement.getDOMNode().id).toBe('test-ID');
      expect(parentElement.id).not.toEqual(inputElement.getDOMNode().id);
    });

    it('should have provided style when style is provided', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = (
        await mountAndWait(
          <SearchInput aria-label="search" style={style} clearButtonAriaLabel="Clear" />
        )
      )
        .find(SearchInput)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided height when height is provided', async () => {
      expect.assertions(1);

      const element = (
        await mountAndWait(
          <SearchInput aria-label="search" height={28} clearButtonAriaLabel="Clear" />
        )
      )
        .find(SearchInput)
        .getDOMNode();

      expect(element.getAttribute('data-height')).toBe('28');
    });

    it('should have default height when height is not provided', async () => {
      expect.assertions(1);

      const element = (
        await mountAndWait(<SearchInput aria-label="search" clearButtonAriaLabel="Clear" />)
      )
        .find(SearchInput)
        .getDOMNode();

      expect(element.getAttribute('data-height')).toBe('32');
    });

    it('should pass the aria label to the input', async () => {
      expect.assertions(1);

      const element = (
        await mountAndWait(
          <SearchInput aria-label="search" searching={true} clearButtonAriaLabel="Clear" />
        )
      )
        .find('input')
        .getDOMNode();

      expect(element.getAttribute('aria-label')).toBe('search');
    });
    it('should have the aria-controls attribute when isComboxbox=true and ariaControls is provided', async () => {
      expect.assertions(1);

      const element = (
        await mountAndWait(
          <SearchInput
            ariaControls="list-element"
            isCombobox={true}
            searching={true}
            clearButtonAriaLabel="Clear"
          />
        )
      )
        .find('input')
        .getDOMNode();

      expect(element.getAttribute('aria-controls')).toBe('list-element');
    });
    it('should have the aria-expanded attribute when isComboxbox=true and isComboboxExpanded is provided', async () => {
      expect.assertions(1);

      const element = (
        await mountAndWait(
          <SearchInput
            isCombobox={true}
            isComboboxExpanded={false}
            searching={true}
            clearButtonAriaLabel="Clear"
          />
        )
      )
        .find('input')
        .getDOMNode();

      expect(element.getAttribute('aria-expanded')).toBe('false');
    });
    it('should have no aria-controls or aria-expanded attributes when isCombobox is not provided', async () => {
      expect.assertions(2);

      const element = (
        await mountAndWait(
          <SearchInput
            ariaControls="list-element"
            isComboboxExpanded={false}
            searching={true}
            clearButtonAriaLabel="Clear"
          />
        )
      )
        .find('input')
        .getDOMNode();

      expect(element.getAttribute('aria-controls')).toBeNull();
      expect(element.getAttribute('aria-expanded')).toBeNull();
    });
    it('should have no aria-controls or aria-expanded attributes when isCombobox=false', async () => {
      expect.assertions(2);

      const element = (
        await mountAndWait(
          <SearchInput
            ariaControls="list-element"
            isCombobox={false}
            isComboboxExpanded={false}
            searching={true}
            clearButtonAriaLabel="Clear"
          />
        )
      )
        .find('input')
        .getDOMNode();

      expect(element.getAttribute('aria-controls')).toBeNull();
      expect(element.getAttribute('aria-expanded')).toBeNull();
    });
    it('should console warn when isCombobox is provided without isComboboxExpanded', async () => {
      expect.assertions(1);
      const logSpy = jest.spyOn(global.console, 'warn');

      await mountAndWait(
        <SearchInput isCombobox={true} searching={true} clearButtonAriaLabel="Clear" />
      );

      expect(logSpy).toHaveBeenCalledWith(WARNINGS.ISCOMBOBOX_1_ISEXPANDED_0);

      logSpy.mockRestore();
    });
    it('should console warn when ariaControls is provided without isCombobox', async () => {
      expect.assertions(1);
      const logSpy = jest.spyOn(global.console, 'warn');

      await mountAndWait(
        <SearchInput
          ariaControls="list-element"
          isComboboxExpanded={false}
          searching={true}
          clearButtonAriaLabel="Clear"
        />
      );

      expect(logSpy).toHaveBeenCalledWith(WARNINGS.ISCOMBOBOX_0_CONTROLS_1);

      logSpy.mockRestore();
    });
    it('should console warn when isComboboxExpanded is provided without isCombobox', async () => {
      expect.assertions(1);
      const logSpy = jest.spyOn(global.console, 'warn');

      await mountAndWait(
        <SearchInput
          ariaControls="list-element"
          isComboboxExpanded={false}
          searching={true}
          clearButtonAriaLabel="Clear"
        />
      );

      expect(logSpy).toHaveBeenCalledWith(WARNINGS.ISCOMBOBOX_0_ISEXPANDED_1);

      logSpy.mockRestore();
    });
    it('should have the combobox role attribute when isCombobox is provided', async () => {
      expect.assertions(1);

      const element = (
        await mountAndWait(
          <SearchInput
            isCombobox={true}
            isComboboxExpanded={false}
            searching={true}
            clearButtonAriaLabel="Clear"
          />
        )
      )
        .find('input')
        .getDOMNode();

      expect(element.getAttribute('role')).toBe('combobox');
    });

    it('should pass label to the input as aria-label', async () => {
      expect.assertions(2);

      const wrapper = await mountAndWait(
        <SearchInput label="a label" clearButtonAriaLabel="Clear" />
      );

      expect(wrapper.find('input').prop('aria-label')).toBe('a label');
      expect(wrapper.find('label').exists()).toBe(false);
    });

    it('should pass aria-label to the input as aria-label', async () => {
      expect.assertions(2);

      const wrapper = await mountAndWait(
        <SearchInput aria-label="a label" clearButtonAriaLabel="Clear" />
      );

      expect(wrapper.find('input').prop('aria-label')).toBe('a label');
      expect(wrapper.find('label').exists()).toBe(false);
    });

    it('should drop label and only pass aria-label to the input if both are specified', async () => {
      expect.assertions(2);

      const wrapper = await mountAndWait(
        <SearchInput aria-label="a label" label="another label" clearButtonAriaLabel="Clear" />
      );

      expect(wrapper.find('input').prop('aria-label')).toBe('a label');
      expect(wrapper.find('label').exists()).toBe(false);
    });

    it('should forward a ref if provided', async () => {
      const ref = React.createRef<HTMLInputElement>();

      await mountAndWait(
        <SearchInput ref={ref} aria-label="search" value="test" clearButtonAriaLabel="Clear" />
      );

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current.value).toEqual('test');
    });

    it('should forward a callback ref if provided', async () => {
      const callbackRef = jest.fn();
      const inputElement = (
        await mountAndWait(
          <SearchInput
            ref={callbackRef}
            aria-label="search"
            value="test"
            clearButtonAriaLabel="Clear"
          />
        )
      )
        .find('input')
        .getDOMNode();

      expect(callbackRef).toBeCalledTimes(1);
      expect(callbackRef).toHaveBeenLastCalledWith(inputElement);
    });

    it('should work with autofocus', async () => {
      await mountAndWait(
        // eslint-disable-next-line jsx-a11y/no-autofocus
        <SearchInput autoFocus aria-label="search" value="test" clearButtonAriaLabel="Clear" />
      );
    });

    it('should not render ButtonSimple if there is no value', async () => {
      const container = await mountAndWait(
        <SearchInput
          aria-label="search"
          value=""
          isDisabled={false}
          clearButtonAriaLabel="clear search"
        />
      );

      expect(container.find(ButtonSimple).exists()).toBe(false);
    });

    it('should not render ButtonSimple if isDisabled is false', async () => {
      const container = await mountAndWait(
        <SearchInput
          aria-label="search"
          value="test"
          isDisabled={true}
          clearButtonAriaLabel="clear search"
        />
      );

      expect(container.find(ButtonSimple).exists()).toBe(false);
    });

    it('should render ButtonSimple if there is a value and isDisabled is false', async () => {
      const container = await mountAndWait(
        <SearchInput
          aria-label="search"
          value="test"
          isDisabled={false}
          clearButtonAriaLabel="clear search"
        />
      );

      expect(container.find(ButtonSimple).exists()).toBe(true);

      expect(container.find(ButtonSimple).props()).toMatchObject({
        className: 'md-search-input-clear',
        'aria-label': 'clear search',
        excludeFromTabOrder: false,
        preventFocusOnPress: true,
        onPress: expect.any(Function),
        onPressStart: expect.any(Function),
        useNativeKeyDown: true,
      });
    });
  });

  describe('actions', () => {
    it('clicking on another part of the component gives focus to the input', async () => {
      expect.assertions(1);

      const wrapper = await mountAndWait(
        <SearchInput aria-label="search" clearButtonAriaLabel="Clear" />
      );

      const inputElement = wrapper.find('input');
      const icon = wrapper.find(Icon);

      const domNode = inputElement.getDOMNode() as HTMLInputElement;
      const focusSpy = jest.spyOn(domNode, 'focus');

      domNode.setSelectionRange(2, 2);

      await act(async () => {
        icon.simulate('click');
      });

      expect(focusSpy).toBeCalledWith();
    });
  });

  it('keyDown event should be propagated to the parent when triggered by Enter key', async () => {
    expect.assertions(3);

    const wrapper = await mountAndWait(
      <SearchInput aria-label="search" clearButtonAriaLabel="Clear" />
    );

    const inputElement = wrapper.find('input');
    const domNode = inputElement.getDOMNode() as HTMLInputElement;
    const parentElement = wrapper.getDOMNode();
    const dispatchEventSpy = jest.spyOn(parentElement, 'dispatchEvent');

    inputElement.simulate('keydown', { key: 'Enter' });

    expect(dispatchEventSpy).toHaveBeenCalledTimes(0);

    inputElement.simulate('change', { target: { value: 'test' } });

    expect(domNode.value).toEqual('test');

    inputElement.simulate('keydown', { key: 'Enter' });

    expect(dispatchEventSpy).toHaveBeenCalledTimes(1);

    dispatchEventSpy.mockRestore();
  });

  it('keyDown event should be propagated to the parent when triggered by Escape key', async () => {
    expect.assertions(1);

    const wrapper = await mountAndWait(
      <SearchInput aria-label="search" clearButtonAriaLabel="Clear" />
    );

    const inputElement = wrapper.find('input');
    const parentElement = wrapper.getDOMNode();
    const dispatchEventSpy = jest.spyOn(parentElement, 'dispatchEvent');

    inputElement.simulate('keydown', { key: 'Escape' });

    expect(dispatchEventSpy).toHaveBeenCalledTimes(1);

    dispatchEventSpy.mockRestore();
  });

  it('should call provided onKeyDown prop', async () => {
    expect.assertions(2);

    const onKeyDown = jest.fn();
    const wrapper = await mountAndWait(
      <SearchInput aria-label="search" clearButtonAriaLabel="Clear" onKeyDown={onKeyDown} />
    );

    const inputElement = wrapper.find('input');
    const parentElement = wrapper.getDOMNode();
    const dispatchEventSpy = jest.spyOn(parentElement, 'dispatchEvent');

    inputElement.simulate('keydown', { key: 'a' });

    expect(dispatchEventSpy).not.toHaveBeenCalled();
    dispatchEventSpy.mockRestore();
    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  it('renders the search icon correctly', async () => {
    const wrapper = await mountAndWait(
      <SearchInput
        clearButtonAriaLabel="Clear"
        searchIconProps={{ ariaLabel: 'search icon label' }}
      />
    );

    expect(wrapper.find(Icon).props()).toStrictEqual({
      weight: 'bold',
      scale: 16,
      className: 'md-search-input-search',
      name: 'search',
      ariaLabel: 'search icon label',
    });
  });
});
