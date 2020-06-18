import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

export const renderWithTheme = (
  children: any,
  { theme, ...options }: Record<string, unknown> = {}
) => {
  const rendered = render(
    <ThemeProvider theme={theme}>{children}</ThemeProvider>,
    options
  );
  return {
    ...rendered,
    rerender: (rerenderUi: any, newOptions?: any) =>
      renderWithTheme(rerenderUi, {
        theme,
        ...options,
        ...newOptions,
        container: rendered.container
      })
  };
};
