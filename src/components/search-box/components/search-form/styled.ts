import styled from 'styled-components';

import ClearIcon from '../../../../img/icon-clear-nap.svg';

const SearchForm = styled.form`
  font-size: 3rem;
  width: 60%;

  @media (max-width: 768px) {
    font-size: 2rem;
    width: 100%;
  }

  label {
    position: relative;
    width: 100%;
  }

  input {
    border: none;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(45, 55, 65, 0.2);
    color: ${({ theme }) => theme.colors.neutralDarker};
    padding: 0.3em 0.5em;
    width: 100%;

    @media (max-width: 768px) {
      padding: 0.6em;
    }
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
      right: 120px;
      top: 22px;

      @media (max-width: 768px) {
        right: 80px;
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
    background-color: ${({ theme }) => theme.colors.searchButtonBg};
    color: #fff;
    display: flex;
    font-size: 0.7em;
    font-weight: 300;
    padding: 0.6em 1em;
    position: absolute;
    right: 0.5em;
    top: 6px;

    @media (max-width: 768px) {
      top: 4px;
    }

    & > img {
      margin-right: 0.2em;
      width: 1em;
    }
  }
`;

export default { SearchForm };
