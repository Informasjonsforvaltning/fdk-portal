import styled from 'styled-components';
import { theme } from '@fellesdatakatalog/theme';

import ClearIconBase from '../../../../images/icon-clear.svg';

const SearchForm = styled.form`
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
  font-size: 3rem;
  display: flex;
  height: 2.5em;
  padding: 0 0.5em;
  position: relative;
  width: 60%;
  justify-content: space-between;

  @media (max-width: 768px) {
    font-size: 2rem;
    width: 100%;
  }

  input {
    border: none;
    color: ${({ theme: t }) => t.extendedColors.neutralDarker};
    flex: 1;
    line-height: normal;
    outline: none;
    width: 80%;

    &::placeholder {
      font-weight: ${theme.fontWeight('FW400')};
    }
  }

  .search-clear {
    background-color: transparent;
    border: none;
    margin-right: 0.3em;
    padding: 0;

    &:focus {
      outline-offset: 3px;
      outline: 2px solid orange;
    }
  }

  .search-button {
    align-items: center;
    border: none;
    border-radius: 5px;
    background-color: ${({ theme: t }) => t.extendedColors.neutralDarker};
    color: #fff;
    display: flex;
    font-size: 0.7em;
    font-weight: 300;
    padding: 0.6em 1em;
    line-height: 1.2;

    &:hover {
      background-color: ${({ theme: t }) => t.extendedColors.neutralDarkest};
    }

    &:focus {
      outline-offset: 3px;
      outline: 2px solid orange;
    }

    & > img {
      margin-right: 0.2em;
      width: 1em;
    }
  }
`;

const ClearIcon = styled(ClearIconBase)`
  width: 20px;
  height: 20px;

  & > path {
    fill: ${({ theme: t }) => t.extendedColors.neutralDarker};
  }

  @media (max-width: 768px) {
    width: 15px;
    height: 15px;
  }
`;

export default {
  SearchForm,
  ClearIcon
};
