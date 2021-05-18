import styled from 'styled-components';
import { theme } from '@fellesdatakatalog/theme';

const onMobileView = '@media (max-width: 768px)';

const FilterToggle = styled.button`
  display: none;
  color: ${({ theme: t }) => t.extendedColors.neutralDarker};

  ${onMobileView} {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 13px;
    border-radius: 5px;
    border: none;
    background-color: ${({ theme: t }) => t.extendedColors.neutralLight};
    width: 100%;
  }

  &:hover {
    color: ${({ theme: t }) => t.extendedColors.neutralDarkest};
  }

  &:active {
    background: black;
    color: ${({ theme: t }) => t.extendedColors.neutralLighter};
  }
`;

const Filters = styled.div`
  ${onMobileView} {
    display: none;
  }
`;

const FiltersSmall = styled.div`
  display: none;
  ${onMobileView} {
    display: flex;
    flex-flow: column;
    top: 0;
    left: 0;
    z-index: 1050;
    width: 100%;
    overflow: hidden;
    outline: 0;
  }

  & > div {
    padding: ${theme.spacing('S10')};
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    pointer-events: auto;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
    outline: 0;
    margin: 5px;
  }
`;

export default {
  Filters,
  FilterToggle,
  FiltersSmall
};
