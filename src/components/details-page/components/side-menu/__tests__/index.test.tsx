/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { DefaultTheme } from '@fellesdatakatalog/theme';
import { scroller } from 'react-scroll';

import { themeFDK } from '../../../../../app/theme';
import { renderWithTheme } from '../../../../../../test/utils';

import SideMenu from '..';
import ContentSection from '../../content-section';
import DetailsPageSC from '../../details-page/styled';

const theme = { ...DefaultTheme, ...themeFDK };

const menuItems = [
  { id: 'description', title: 'Description' },
  { id: 'distributions', title: 'Distributions' }
];

const renderMenu = (isSticky: boolean) =>
  renderWithTheme(
    <>
      <SideMenu menuItems={menuItems} isSticky={isSticky} />
      {menuItems.map(({ id, title }) => (
        <ContentSection key={id} id={id} title={title} />
      ))}
    </>,
    { theme }
  );

afterEach(() => jest.restoreAllMocks());

describe.each([false, true])('SideMenu with isSticky=%s', isSticky => {
  it('renders the table of contents as an ordered list in section order', () => {
    const { getByRole, getAllByRole } = renderMenu(isSticky);

    expect(getByRole('list').tagName).toBe('OL');
    expect(getAllByRole('listitem').map(item => item.textContent)).toEqual(
      menuItems.map(({ title }) => title)
    );
  });

  it('renders focusable links with fragment destinations for each section', () => {
    const { getByRole } = renderMenu(isSticky);

    menuItems.forEach(({ id, title }) => {
      const link = getByRole('link', { name: title });
      expect(link).toHaveAttribute('href', `#${id}`);
      expect(document.getElementById(id)).toBeInTheDocument();

      link.focus();
      expect(link).toHaveFocus();
    });
  });

  it('preserves smooth scrolling to the selected section', () => {
    const scrollTo = jest
      .spyOn(scroller, 'scrollTo')
      .mockImplementation(() => {});
    const { getByText } = renderMenu(isSticky);

    menuItems.forEach(({ id, title }, index) => {
      fireEvent.click(getByText(title, { selector: 'a' }));
      expect(scrollTo).toHaveBeenNthCalledWith(
        index + 1,
        id,
        expect.objectContaining({ smooth: true, isDynamic: true, spy: true })
      );
    });
  });
});

it('preserves mobile menu item styling and link indentation', () => {
  const { getByRole } = renderWithTheme(
    <DetailsPageSC.SideMenuSmall menuItems={menuItems} />,
    { theme }
  );
  const menu = getByRole('complementary', { hidden: true });
  const media = '(max-width: 900px)';

  expect(getByRole('list', { hidden: true }).tagName).toBe('OL');
  Object.entries({
    'background-color': theme.extendedColors.neutralLighter,
    'border-radius': '5px',
    'margin-top': '2px',
    'margin-bottom': '2px'
  }).forEach(([property, value]) => {
    expect(menu).toHaveStyleRule(property, value, {
      media,
      modifier: 'nav ol > li'
    });
  });
  expect(menu).toHaveStyleRule('margin-left', '20px', {
    media,
    modifier: 'nav ol > li a'
  });
});

it('renders an empty menu when no items are supplied', () => {
  const { getByRole, queryAllByRole } = renderWithTheme(<SideMenu />, {
    theme
  });

  expect(getByRole('navigation')).toBeInTheDocument();
  expect(queryAllByRole('listitem')).toHaveLength(0);
});
