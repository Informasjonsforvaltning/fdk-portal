import styled from 'styled-components';

import FooterBackground from '../../img/illustration-footer-portal.svg';

const Footer = styled.footer`
  background-color: ${({ theme }) => theme.colors.neutralDarker};
  background-repeat: no-repeat;
  background-position: bottom left;
  background-image: url(${FooterBackground});
  background-size: 60%;
  color: #fff;
  font-size: 1.6rem;
  margin-top: 60px;

  @media (min-width: 992px) {
    height: 400px;
  }
`;

const FooterContent = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  padding: 3em;

  @media (min-width: 992px) {
    flex-flow: row;
  }
`;

const Box = styled.div`
  font-weight: 300;
  margin-bottom: 2em;

  @media (min-width: 992px) {
    width: 20%;
  }
`;

const BoxHeader = styled.div`
  font-size: 1.2em;
  font-weight: 500;
  margin-bottom: 0.5em;
`;

const BoxList = styled.ul`
  list-style-type: none;
  margin-top: 0.5em;
  padding: 0;
`;

const BoxListLink = styled.li`
  margin-bottom: 0.1em;

  & > a {
    color: #fff;
    text-decoration: underline;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default {
  Footer,
  FooterContent,
  Box,
  BoxHeader,
  BoxList,
  BoxListLink
};
