import styled from 'styled-components';

const onMobileView = '@media (max-width: 990px)';

const MenuItem = styled.li`
  white-space: nowrap;
  font-size: 14px;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.extendedColors.neutralLightest};
  }

  ${onMobileView} {
    font-size: 16px;
  }
`;

const ButtonItem = styled.button`
  width: 100%;
  height: 100%;
  padding: 7px 14px 7px 14px;
  border: none;
  background: none;
  text-align: left;

  ${onMobileView} {
    padding: 14px 28px 14px 28px;
  }
`;

const LinkItem = styled.div`
  & > a {
    width: 100%;
    height: 100%;
    padding: 7px 14px 7px 14px;

    cursor: pointer;

    & > div {
      border: none;
      color: ${({ theme }) => theme.extendedColors.link} !important;
    }

    ${onMobileView} {
      padding: 14px 28px 14px 28px;
    }
  }
`;

export default { MenuItem, ButtonItem, LinkItem };
