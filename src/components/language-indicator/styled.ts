import { Colour, theme as fdkTheme } from '@fellesdatakatalog/theme';
import styled from 'styled-components';

const TextLanguageLabel = styled.span<{ $whiteBackground: boolean }>`
  border-radius: 2px;
  padding: 0 ${fdkTheme.spacing('S4')};
  font-size: ${fdkTheme.fontSize('FS14')};
  font-weight: ${fdkTheme.fontWeight('FW700')};
  background: ${({ $whiteBackground, theme }) =>
    $whiteBackground
      ? fdkTheme.colour(Colour.NEUTRAL, 'N15')
      : theme?.entityColours?.light ?? theme.light};

  color: ${({ theme }) => theme?.entityColours?.dark ?? theme.dark};
`;

const TextLanguageCodesContainer = styled.div<{ $whiteBackground: boolean }>`
  display: inline-flex;
  margin-right: ${fdkTheme.spacing('S4')};
  & > ${TextLanguageLabel} {
    margin-left: ${fdkTheme.spacing('S4')};
  }
`;

export default {
  TextLanguageCodesContainer,
  TextLanguageLabel
};
