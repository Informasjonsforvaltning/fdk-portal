import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';

const User = styled.a`
  display: inline-flex;
  align-items: center;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

const Icon = styled.div<{ colour: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  background-color: ${({ colour }) => colour};
  font-size: ${theme.fontSize('FS16')};
  font-weight: ${theme.fontWeight('FW700')};
  width: 23px;
  height: 23px;
  border-radius: 50%;
  margin-right: 5px;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

const Picture = styled.img`
  width: 23px;
  height: 23px;
  border-radius: 50%;
  margin-right: 5px;
`;

const Name = styled.span<{ colour: string }>`
  color: ${({ colour }) => colour};
  font-weight: ${theme.fontWeight('FW700')};
  margin-right: 5px;

  &:hover {
    text-decoration: underline;
    text-decoration-color: ${({ colour }) => colour};
  }
`;

export default { User, Icon, Name, Picture };
