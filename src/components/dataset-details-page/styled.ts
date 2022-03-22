import styled from 'styled-components';
import { Colour, theme } from '@fellesdatakatalog/theme';
import Link from '@fellesdatakatalog/link';

const ExternalLinkList = styled.div`
  display: flex;
  flex-direction: column;
`;

const Section = styled.div`
  padding: 10px 0;
  border-top: 1px solid ${theme.colour(Colour.NEUTRAL, 'N20')};
`;

const DownloadLink = styled(Link)`
  margin-right: ${theme.spacing('S16')};
  background-color: ${theme.colour(Colour.BLUE, 'B30')};
  padding: ${theme.spacing('S16')};
  border-radius: 5px;

  & > div {
    border-bottom: 0;
  }

  & > i > svg > path {
    fill: ${theme.colour(Colour.BLUE, 'B50')};
  }
`;

const PreviewLink = styled(Link)`
  margin-right: ${theme.spacing('S16')};
  background-color: ${theme.colour(Colour.BLUE, 'B30')};
  padding: ${theme.spacing('S16')};
  border-radius: 5px;

  & > div {
    border-bottom: 0;
  }

  & > i > svg > path {
    fill: none;
  }
`;

export default { ExternalLinkList, Section, DownloadLink, PreviewLink };
