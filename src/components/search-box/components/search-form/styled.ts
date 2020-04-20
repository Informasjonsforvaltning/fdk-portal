import styled from 'styled-components';

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
    color: ${({ theme }) => theme.colors.neutralDarker};
    flex: 1;
    line-height: normal;
    outline: none;
    width: 80%;
  }

  .search-clear {
    background-color: transparent;
    border: none;
    margin-right: 0.3em;
    outline: none;
    padding: 0;
  }

  .search-button {
    align-items: center;
    border: none;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.neutralDarker};
    color: #fff;
    display: flex;
    font-size: 0.7em;
    font-weight: 300;
    padding: 0.6em 1em;

    &:hover {
      background-color: ${({ theme }) => theme.colors.neutralDarkest};
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
    fill: ${({ theme }) => theme.colors.neutralDarker};
  }

  @media (max-width: 768px) {
    width: 15px;
    height: 15px;
  }
`;

export default { SearchForm, ClearIcon };
