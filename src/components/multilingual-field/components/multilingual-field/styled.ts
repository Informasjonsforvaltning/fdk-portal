import styled, { css } from 'styled-components';

const MultiLingualField = styled.div`
  display: flex;
  flex-direction: column;
`;

const LanguageField = styled.div<{ $alignCenter?: boolean }>`
  ${({ $alignCenter }) =>
    $alignCenter
      ? css`
          align-items: center;
        `
      : css`
          align-items: flex-start;
        `}

  display: flex;
  margin-bottom: 0.5em;
`;

export default { MultiLingualField, LanguageField };
