import styled from 'styled-components';
import { theme, Colour, Unit } from '@fellesdatakatalog/theme';

const PostLink = styled.a`
  background-color: transparent;
  padding: ${theme.spacing('S10')} ${theme.spacing('S10')} 0;
  font-size: ${theme.fontSize('FS16', Unit.REM)};

  & > h5 {
    font-weight: ${theme.fontWeight('FW700')};
    line-height: 18px;
    display: flex;
    align-items: center;
    color: ${theme.colour(Colour.NEUTRAL, 'N60')};
    margin-bottom: ${theme.spacing('S10')};
  }

  && {
    color: ${theme.colour(Colour.NEUTRAL, 'N60')};
  }

  &&:hover {
    color: ${theme.colour(Colour.NEUTRAL, 'N60')};
    box-shadow: 2px 5px 6px rgba(0, 0, 0, 0.15);
    background-color: ${theme.colour(Colour.NEUTRAL, 'N15')};
    text-decoration: none;

    h5 {
      text-decoration: underline;
    }
  }
`;

const UserInfo = styled.span`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  text-align: right;
  margin-bottom: ${theme.spacing('S10')};
  color: ${theme.colour(Colour.NEUTRAL, 'N50')};
`;

export default { PostLink, UserInfo };
