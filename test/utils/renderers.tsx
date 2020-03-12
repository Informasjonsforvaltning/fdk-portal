import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

export const renderWithTheme = (
  children: any,
  { theme = {} }: { theme?: any }
) => {
  const rendered = render(
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  );
  return {
    ...rendered,
    rerender: (rerenderUi: any, rerenderTheme: any) => {
      rendered.container.remove();
      return renderWithTheme(rerenderUi, rerenderTheme);
    }
  };
};
