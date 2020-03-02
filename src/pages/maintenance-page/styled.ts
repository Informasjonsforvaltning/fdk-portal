import styled from 'styled-components';

import { LinkExternal } from '../../components/link-external/link-external.component';

const MaintenancePage = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 100vh;
`;

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
`;

const Heading = styled.h1`
  font-size: 5rem;
`;

const Subheading = styled.h2`
  margin-top: 30px;
  text-align: center;
  font-weight: normal;

  & > p {
    margin: 0;
  }

  & > p:nth-of-type(n + 2) {
    margin: 5px;
  }
`;

const Link = styled(LinkExternal)`
  margin-top: 5px;
  font-size: 2.5rem;
  font-weight: bold;
`;

const RedirectionNotice = styled.p`
  margin: 0;
  margin-top: 30px;
  font-size: 1.8rem;
`;

export default {
  MaintenancePage,
  PageContent,
  Heading,
  Subheading,
  Link,
  RedirectionNotice
};
