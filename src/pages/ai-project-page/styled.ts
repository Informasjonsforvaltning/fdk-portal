import styled from 'styled-components';
import { theme, Unit } from '@fellesdatakatalog/theme';

const Header = styled.h1`
  font-size: ${theme.fontSize('FS40', Unit.REM)};
  font-weight: 600;
`;

const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2em;
`;

const Filter = styled.div`
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid;
  font-size: ${theme.fontSize('FS28', Unit.REM)};
  display: flex;
  height: 2.5em;
  padding: 0 0.5em;
  position: relative;
  width: 100%;
  justify-content: space-between;

  @media (max-width: 768px) {
    font-size: ${theme.fontSize('FS20', Unit.REM)};
    width: 100%;
  }

  input {
    border: none;
    color: ${({ theme: t }) => t.extendedColors.neutralDarker};
    flex: 1;
    line-height: normal;
    outline: none;
    width: 80%;
  }

  .search-clear {
    background-color: transparent;
    border: none;
    margin-right: 0.3em;
    padding: 0;
  }
`;

const SearchButton = styled.button`
  display: flex;
`;

const IconWrapper = styled.div`
  & > svg {
    width: 30px;
    height: 30px;
  }
  & * {
    stroke: ${({ theme: t }) => t.extendedColors.neutralDarker};
  }

  @media (max-width: 768px) {
    & > svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ButtonIconWrapper = styled.div`
  & > svg {
    width: 16px;
    height: 16px;
    margin-right: 0.3em;
  }
`;

export default {
  Header,
  SearchBox,
  Filter,
  SearchButton,
  IconWrapper,
  ButtonRow,
  ButtonIconWrapper
};
