import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';

const PostLink = styled.a`
  padding: 20px 15px;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: ${theme.colour(Colour.NEUTRAL, 'N0')};

  & > h3 {
    font-size: 16px;
    font-weight: ${theme.fontWeight('FW700')};
    margin-bottom: 10px;
  }

  && {
    color: ${theme.colour(Colour.NEUTRAL, 'N60')};
  }

  &&:hover {
    color: ${theme.colour(Colour.NEUTRAL, 'N60')};
    box-shadow: 2px 5px 6px rgba(0, 0, 0, 0.15);
    text-decoration: none;
  }
`;

const UserInfo = styled.span`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 10px;
  color: ${theme.colour(Colour.NEUTRAL, 'N50')};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;

  & > p {
    overflow-wrap: anywhere;
  }
`;

export default { PostLink, UserInfo, Content };
