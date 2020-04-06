import styled from 'styled-components';

import ClearIcon from '../../../../img/icon-clear-nap.svg';

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
    border: none;
    padding: 0;
    &:after {
      background-image: url(${ClearIcon});
      content: '';
      cursor: pointer;
      position: absolute;
      z-index: 1;
      width: 20px;
      height: 20px;
      right: 130px;
      top: 28px;

      @media (max-width: 768px) {
        right: 85px;
        top: 18px;
        width: 15px;
        height: 15px;
      }
    }
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

export default { SearchForm };
