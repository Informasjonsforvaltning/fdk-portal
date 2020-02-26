import React from 'react';
import { render, cleanup } from '@testing-library/react';

import SC from '../styled';

afterEach(cleanup);

describe('Styled components for ExpansionPanel component', () => {
  describe('SC.ExpansionPanel component', () => {
    it('must render correct HTML element', () => {
      const { container } = render(<SC.ExpansionPanel />);

      expect(container).not.toBeEmpty();
      expect(container.children).toHaveLength(1);
      expect(container.childNodes).toHaveLength(1);
      expect(container.firstElementChild!.tagName).toEqual('DIV');
    });

    it('must not render children if no children are provided', () => {
      const { container } = render(<SC.ExpansionPanel />);

      expect(container).not.toBeEmpty();
      expect(container.children).toHaveLength(1);
      expect(container.childNodes).toHaveLength(1);
      expect(container.firstElementChild).not.toBeNull();
      expect(container.firstElementChild).toBeEmpty();
      expect(container.firstElementChild!.children).toHaveLength(0);
      expect(container.firstElementChild!.childNodes).toHaveLength(0);
    });

    it('must render single text child node correctly', () => {
      const text = 'text child';

      const { container } = render(
        <SC.ExpansionPanel>{text}</SC.ExpansionPanel>
      );

      expect(container).not.toBeEmpty();
      expect(container.children).toHaveLength(1);
      expect(container.childNodes).toHaveLength(1);
      expect(container.firstElementChild).not.toBeNull();
      expect(container.firstElementChild).not.toBeEmpty();
      expect(container.firstElementChild!.children).toHaveLength(0);
      expect(container.firstElementChild!.childNodes).toHaveLength(1);
      expect(container.firstElementChild).toHaveTextContent(text);
    });

    it('must render single element child node correctly', () => {
      const childTestId = 'child';

      const { container, getAllByTestId } = render(
        <SC.ExpansionPanel>
          <div data-testid={childTestId}>child</div>
        </SC.ExpansionPanel>
      );

      expect(container).not.toBeEmpty();
      expect(container.children).toHaveLength(1);
      expect(container.childNodes).toHaveLength(1);
      expect(container.firstElementChild).not.toBeNull();
      expect(container.firstElementChild).not.toBeEmpty();
      expect(container.firstElementChild!.children).toHaveLength(1);
      expect(container.firstElementChild!.childNodes).toHaveLength(1);
      expect(getAllByTestId(childTestId)).toHaveLength(1);
    });

    it('must render multiple element child nodes correctly', () => {
      const childTestId = 'child';

      const { container, getAllByTestId } = render(
        <SC.ExpansionPanel>
          <div data-testid={childTestId}>child 1</div>
          <div data-testid={childTestId}>child 2</div>
        </SC.ExpansionPanel>
      );

      expect(container).not.toBeEmpty();
      expect(container.children).toHaveLength(1);
      expect(container.childNodes).toHaveLength(1);
      expect(container.firstElementChild).not.toBeNull();
      expect(container.firstElementChild).not.toBeEmpty();
      expect(container.firstElementChild!.children).toHaveLength(2);
      expect(container.firstElementChild!.childNodes).toHaveLength(2);
      expect(getAllByTestId(childTestId)).toHaveLength(2);
    });

    it('must render text and element child nodes correctly', () => {
      const textBefore = 'text before';
      const textAfter = 'text after';
      const childTestId = 'child';

      const { container, getAllByTestId } = render(
        <SC.ExpansionPanel>
          {textBefore}
          <div data-testid={childTestId}>child 1</div>
          <div data-testid={childTestId}>child 2</div>
          {textAfter}
        </SC.ExpansionPanel>
      );

      expect(container).not.toBeEmpty();
      expect(container.children).toHaveLength(1);
      expect(container.childNodes).toHaveLength(1);
      expect(container.firstElementChild).not.toBeNull();
      expect(container.firstElementChild).not.toBeEmpty();
      expect(container.firstElementChild!.children).toHaveLength(2);
      expect(container.firstElementChild!.childNodes).toHaveLength(4);
      expect(container.firstElementChild!.firstChild!.textContent).toEqual(
        textBefore
      );
      expect(container.firstElementChild!.lastChild!.textContent).toEqual(
        textAfter
      );
      expect(getAllByTestId(childTestId)).toHaveLength(2);
    });
  });

  describe('SC.HeadContent component', () => {
    it('must render correct HTML element', () => {
      const { container } = render(<SC.HeadContent />);

      expect(container).not.toBeEmpty();
      expect(container.children).toHaveLength(1);
      expect(container.childNodes).toHaveLength(1);
      expect(container.firstElementChild!.tagName).toEqual('DIV');
    });

    it('must not render children if no children are provided', () => {
      const { container } = render(<SC.HeadContent />);

      expect(container).not.toBeEmpty();
      expect(container.children).toHaveLength(1);
      expect(container.childNodes).toHaveLength(1);
      expect(container.firstElementChild).not.toBeNull();
      expect(container.firstElementChild).toBeEmpty();
      expect(container.firstElementChild!.children).toHaveLength(0);
      expect(container.firstElementChild!.childNodes).toHaveLength(0);
    });

    it('must render single text child node correctly', () => {
      const text = 'text child';

      const { container } = render(<SC.HeadContent>{text}</SC.HeadContent>);

      expect(container).not.toBeEmpty();
      expect(container.children).toHaveLength(1);
      expect(container.childNodes).toHaveLength(1);
      expect(container.firstElementChild).not.toBeNull();
      expect(container.firstElementChild).not.toBeEmpty();
      expect(container.firstElementChild!.children).toHaveLength(0);
      expect(container.firstElementChild!.childNodes).toHaveLength(1);
      expect(container.firstElementChild).toHaveTextContent(text);
    });

    it('must render single element child node correctly', () => {
      const childTestId = 'child';

      const { container, getAllByTestId } = render(
        <SC.HeadContent>
          <div data-testid={childTestId}>child</div>
        </SC.HeadContent>
      );

      expect(container).not.toBeEmpty();
      expect(container.children).toHaveLength(1);
      expect(container.childNodes).toHaveLength(1);
      expect(container.firstElementChild).not.toBeNull();
      expect(container.firstElementChild).not.toBeEmpty();
      expect(container.firstElementChild!.children).toHaveLength(1);
      expect(container.firstElementChild!.childNodes).toHaveLength(1);
      expect(getAllByTestId(childTestId)).toHaveLength(1);
    });

    it('must render multiple element child nodes correctly', () => {
      const childTestId = 'child';

      const { container, getAllByTestId } = render(
        <SC.HeadContent>
          <div data-testid={childTestId}>child 1</div>
          <div data-testid={childTestId}>child 2</div>
        </SC.HeadContent>
      );

      expect(container).not.toBeEmpty();
      expect(container.children).toHaveLength(1);
      expect(container.childNodes).toHaveLength(1);
      expect(container.firstElementChild).not.toBeNull();
      expect(container.firstElementChild).not.toBeEmpty();
      expect(container.firstElementChild!.children).toHaveLength(2);
      expect(container.firstElementChild!.childNodes).toHaveLength(2);
      expect(getAllByTestId(childTestId)).toHaveLength(2);
    });

    it('must render text and element child nodes correctly', () => {
      const textBefore = 'text before';
      const textAfter = 'text after';
      const childTestId = 'child';

      const { container, getAllByTestId } = render(
        <SC.HeadContent>
          {textBefore}
          <div data-testid={childTestId}>child 1</div>
          <div data-testid={childTestId}>child 2</div>
          {textAfter}
        </SC.HeadContent>
      );

      expect(container).not.toBeEmpty();
      expect(container.children).toHaveLength(1);
      expect(container.childNodes).toHaveLength(1);
      expect(container.firstElementChild).not.toBeNull();
      expect(container.firstElementChild).not.toBeEmpty();
      expect(container.firstElementChild!.children).toHaveLength(2);
      expect(container.firstElementChild!.childNodes).toHaveLength(4);
      expect(container.firstElementChild!.firstChild!.textContent).toEqual(
        textBefore
      );
      expect(container.firstElementChild!.lastChild!.textContent).toEqual(
        textAfter
      );
      expect(getAllByTestId(childTestId)).toHaveLength(2);
    });
  });

  describe('SC.HeadExpansionIndicator component', () => {
    it('must render correct HTML element', () => {
      const { container } = render(<SC.HeadExpansionIndicator />);

      expect(container).not.toBeEmpty();
      expect(container.children).toHaveLength(1);
      expect(container.childNodes).toHaveLength(1);
      expect(container.firstElementChild!.tagName).toEqual('DIV');
    });

    it('must not render children if no children are provided', () => {
      const { container } = render(<SC.HeadExpansionIndicator />);

      expect(container).not.toBeEmpty();
      expect(container.children).toHaveLength(1);
      expect(container.childNodes).toHaveLength(1);
      expect(container.firstElementChild).not.toBeNull();
      expect(container.firstElementChild).toBeEmpty();
      expect(container.firstElementChild!.children).toHaveLength(0);
      expect(container.firstElementChild!.childNodes).toHaveLength(0);
    });

    it('must render single text child node correctly', () => {
      const text = 'text child';

      const { container } = render(
        <SC.HeadExpansionIndicator>{text}</SC.HeadExpansionIndicator>
      );

      expect(container).not.toBeEmpty();
      expect(container.children).toHaveLength(1);
      expect(container.childNodes).toHaveLength(1);
      expect(container.firstElementChild).not.toBeNull();
      expect(container.firstElementChild).not.toBeEmpty();
      expect(container.firstElementChild!.children).toHaveLength(0);
      expect(container.firstElementChild!.childNodes).toHaveLength(1);
      expect(container.firstElementChild).toHaveTextContent(text);
    });

    it('must render single element child node correctly', () => {
      const childTestId = 'child';

      const { container, getAllByTestId } = render(
        <SC.HeadExpansionIndicator>
          <div data-testid={childTestId}>child</div>
        </SC.HeadExpansionIndicator>
      );

      expect(container).not.toBeEmpty();
      expect(container.children).toHaveLength(1);
      expect(container.childNodes).toHaveLength(1);
      expect(container.firstElementChild).not.toBeNull();
      expect(container.firstElementChild).not.toBeEmpty();
      expect(container.firstElementChild!.children).toHaveLength(1);
      expect(container.firstElementChild!.childNodes).toHaveLength(1);
      expect(getAllByTestId(childTestId)).toHaveLength(1);
    });

    it('must render multiple element child nodes correctly', () => {
      const childTestId = 'child';

      const { container, getAllByTestId } = render(
        <SC.HeadExpansionIndicator>
          <div data-testid={childTestId}>child 1</div>
          <div data-testid={childTestId}>child 2</div>
        </SC.HeadExpansionIndicator>
      );

      expect(container).not.toBeEmpty();
      expect(container.children).toHaveLength(1);
      expect(container.childNodes).toHaveLength(1);
      expect(container.firstElementChild).not.toBeNull();
      expect(container.firstElementChild).not.toBeEmpty();
      expect(container.firstElementChild!.children).toHaveLength(2);
      expect(container.firstElementChild!.childNodes).toHaveLength(2);
      expect(getAllByTestId(childTestId)).toHaveLength(2);
    });

    it('must render text and element child nodes correctly', () => {
      const textBefore = 'text before';
      const textAfter = 'text after';
      const childTestId = 'child';

      const { container, getAllByTestId } = render(
        <SC.HeadExpansionIndicator>
          {textBefore}
          <div data-testid={childTestId}>child 1</div>
          <div data-testid={childTestId}>child 2</div>
          {textAfter}
        </SC.HeadExpansionIndicator>
      );

      expect(container).not.toBeEmpty();
      expect(container.children).toHaveLength(1);
      expect(container.childNodes).toHaveLength(1);
      expect(container.firstElementChild).not.toBeNull();
      expect(container.firstElementChild).not.toBeEmpty();
      expect(container.firstElementChild!.children).toHaveLength(2);
      expect(container.firstElementChild!.childNodes).toHaveLength(4);
      expect(container.firstElementChild!.firstChild!.textContent).toEqual(
        textBefore
      );
      expect(container.firstElementChild!.lastChild!.textContent).toEqual(
        textAfter
      );
      expect(getAllByTestId(childTestId)).toHaveLength(2);
    });
  });

  describe('SC.Head component', () => {
    it('must render correct HTML element', () => {
      const { container } = render(<SC.Head />);

      expect(container).not.toBeEmpty();
      expect(container.children).toHaveLength(1);
      expect(container.childNodes).toHaveLength(1);
      expect(container.firstElementChild!.tagName).toEqual('DIV');
    });

    it('must not render children if no children are provided', () => {
      const { container } = render(<SC.Head />);

      expect(container).not.toBeEmpty();
      expect(container.children).toHaveLength(1);
      expect(container.childNodes).toHaveLength(1);
      expect(container.firstElementChild).not.toBeNull();
      expect(container.firstElementChild).toBeEmpty();
      expect(container.firstElementChild!.children).toHaveLength(0);
      expect(container.firstElementChild!.childNodes).toHaveLength(0);
    });

    it('must render single text child node correctly', () => {
      const text = 'text child';

      const { container } = render(<SC.Head>{text}</SC.Head>);

      expect(container).not.toBeEmpty();
      expect(container.children).toHaveLength(1);
      expect(container.childNodes).toHaveLength(1);
      expect(container.firstElementChild).not.toBeNull();
      expect(container.firstElementChild).not.toBeEmpty();
      expect(container.firstElementChild!.children).toHaveLength(0);
      expect(container.firstElementChild!.childNodes).toHaveLength(1);
      expect(container.firstElementChild).toHaveTextContent(text);
    });

    it('must render single element child node correctly', () => {
      const childTestId = 'child';

      const { container, getAllByTestId } = render(
        <SC.Head>
          <div data-testid={childTestId}>child</div>
        </SC.Head>
      );

      expect(container).not.toBeEmpty();
      expect(container.children).toHaveLength(1);
      expect(container.childNodes).toHaveLength(1);
      expect(container.firstElementChild).not.toBeNull();
      expect(container.firstElementChild).not.toBeEmpty();
      expect(container.firstElementChild!.children).toHaveLength(1);
      expect(container.firstElementChild!.childNodes).toHaveLength(1);
      expect(getAllByTestId(childTestId)).toHaveLength(1);
    });

    it('must render multiple element child nodes correctly', () => {
      const childTestId = 'child';

      const { container, getAllByTestId } = render(
        <SC.Head>
          <div data-testid={childTestId}>child 1</div>
          <div data-testid={childTestId}>child 2</div>
        </SC.Head>
      );

      expect(container).not.toBeEmpty();
      expect(container.children).toHaveLength(1);
      expect(container.childNodes).toHaveLength(1);
      expect(container.firstElementChild).not.toBeNull();
      expect(container.firstElementChild).not.toBeEmpty();
      expect(container.firstElementChild!.children).toHaveLength(2);
      expect(container.firstElementChild!.childNodes).toHaveLength(2);
      expect(getAllByTestId(childTestId)).toHaveLength(2);
    });

    it('must render text and element child nodes correctly', () => {
      const textBefore = 'text before';
      const textAfter = 'text after';
      const childTestId = 'child';

      const { container, getAllByTestId } = render(
        <SC.Head>
          {textBefore}
          <div data-testid={childTestId}>child 1</div>
          <div data-testid={childTestId}>child 2</div>
          {textAfter}
        </SC.Head>
      );

      expect(container).not.toBeEmpty();
      expect(container.children).toHaveLength(1);
      expect(container.childNodes).toHaveLength(1);
      expect(container.firstElementChild).not.toBeNull();
      expect(container.firstElementChild).not.toBeEmpty();
      expect(container.firstElementChild!.children).toHaveLength(2);
      expect(container.firstElementChild!.childNodes).toHaveLength(4);
      expect(container.firstElementChild!.firstChild!.textContent).toEqual(
        textBefore
      );
      expect(container.firstElementChild!.lastChild!.textContent).toEqual(
        textAfter
      );
      expect(getAllByTestId(childTestId)).toHaveLength(2);
    });
  });

  describe('SC.CollapseIcon component', () => {
    it('must render correct HTML element', () => {
      const { container } = render(<SC.CollapseIcon />);

      expect(container).not.toBeEmpty();
      expect(container.children).toHaveLength(1);
      expect(container.childNodes).toHaveLength(1);
      expect(container.firstElementChild!.tagName).toEqual('svg');
    });

    it('must have necessary style rules', () => {
      const imageHeight = 16;
      const imageWidth = 16;

      const { container } = render(<SC.CollapseIcon />);

      (expect(container.firstChild) as any).toHaveStyleRule(
        'height',
        `${imageHeight}px`
      );
      (expect(container.firstChild) as any).toHaveStyleRule(
        'width',
        `${imageWidth}px`
      );
    });
  });

  describe('SC.ExpandIcon component', () => {
    it('must render correct HTML element', () => {
      const { container } = render(<SC.ExpandIcon />);

      expect(container).not.toBeEmpty();
      expect(container.children).toHaveLength(1);
      expect(container.childNodes).toHaveLength(1);
      expect(container.firstElementChild!.tagName).toEqual('svg');
    });

    it('must have necessary style rules', () => {
      const imageHeight = 16;
      const imageWidth = 16;

      const { container } = render(<SC.ExpandIcon />);

      (expect(container.firstChild) as any).toHaveStyleRule(
        'height',
        `${imageHeight}px`
      );
      (expect(container.firstChild) as any).toHaveStyleRule(
        'width',
        `${imageWidth}px`
      );
    });
  });

  describe('SC.Body component', () => {
    it('must render correct HTML element', () => {
      const { container } = render(<SC.Body />);

      expect(container).not.toBeEmpty();
      expect(container.children).toHaveLength(1);
      expect(container.childNodes).toHaveLength(1);
      expect(container.firstElementChild!.tagName).toEqual('DIV');
    });

    it('must not render children if no children are provided', () => {
      const { container } = render(<SC.Body />);

      expect(container).not.toBeEmpty();
      expect(container.children).toHaveLength(1);
      expect(container.childNodes).toHaveLength(1);
      expect(container.firstElementChild).not.toBeNull();
      expect(container.firstElementChild).toBeEmpty();
      expect(container.firstElementChild!.children).toHaveLength(0);
      expect(container.firstElementChild!.childNodes).toHaveLength(0);
    });

    it('must render single text child node correctly', () => {
      const text = 'text child';

      const { container } = render(<SC.Body>{text}</SC.Body>);

      expect(container).not.toBeEmpty();
      expect(container.children).toHaveLength(1);
      expect(container.childNodes).toHaveLength(1);
      expect(container.firstElementChild).not.toBeNull();
      expect(container.firstElementChild).not.toBeEmpty();
      expect(container.firstElementChild!.children).toHaveLength(0);
      expect(container.firstElementChild!.childNodes).toHaveLength(1);
      expect(container.firstElementChild).toHaveTextContent(text);
    });

    it('must render single element child node correctly', () => {
      const childTestId = 'child';

      const { container, getAllByTestId } = render(
        <SC.Body>
          <div data-testid={childTestId}>child</div>
        </SC.Body>
      );

      expect(container).not.toBeEmpty();
      expect(container.children).toHaveLength(1);
      expect(container.childNodes).toHaveLength(1);
      expect(container.firstElementChild).not.toBeNull();
      expect(container.firstElementChild).not.toBeEmpty();
      expect(container.firstElementChild!.children).toHaveLength(1);
      expect(container.firstElementChild!.childNodes).toHaveLength(1);
      expect(getAllByTestId(childTestId)).toHaveLength(1);
    });

    it('must render multiple element child nodes correctly', () => {
      const childTestId = 'child';

      const { container, getAllByTestId } = render(
        <SC.Body>
          <div data-testid={childTestId}>child 1</div>
          <div data-testid={childTestId}>child 2</div>
        </SC.Body>
      );

      expect(container).not.toBeEmpty();
      expect(container.children).toHaveLength(1);
      expect(container.childNodes).toHaveLength(1);
      expect(container.firstElementChild).not.toBeNull();
      expect(container.firstElementChild).not.toBeEmpty();
      expect(container.firstElementChild!.children).toHaveLength(2);
      expect(container.firstElementChild!.childNodes).toHaveLength(2);
      expect(getAllByTestId(childTestId)).toHaveLength(2);
    });

    it('must render text and element child nodes correctly', () => {
      const textBefore = 'text before';
      const textAfter = 'text after';
      const childTestId = 'child';

      const { container, getAllByTestId } = render(
        <SC.Body>
          {textBefore}
          <div data-testid={childTestId}>child 1</div>
          <div data-testid={childTestId}>child 2</div>
          {textAfter}
        </SC.Body>
      );

      expect(container).not.toBeEmpty();
      expect(container.children).toHaveLength(1);
      expect(container.childNodes).toHaveLength(1);
      expect(container.firstElementChild).not.toBeNull();
      expect(container.firstElementChild).not.toBeEmpty();
      expect(container.firstElementChild!.children).toHaveLength(2);
      expect(container.firstElementChild!.childNodes).toHaveLength(4);
      expect(container.firstElementChild!.firstChild!.textContent).toEqual(
        textBefore
      );
      expect(container.firstElementChild!.lastChild!.textContent).toEqual(
        textAfter
      );
      expect(getAllByTestId(childTestId)).toHaveLength(2);
    });
  });
});
