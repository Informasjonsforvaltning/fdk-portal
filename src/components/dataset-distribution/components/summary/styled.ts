import styled from 'styled-components';

const Summary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h4`
  flex: 1;
  margin: 0;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.dataset.dark};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Formats = styled.div`
  display: flex;
  margin-left: 12px;
`;

const Format = styled.div`
  &:nth-of-type(n + 2) {
    margin-left: 8px;
  }

  & > svg {
    height: 40px;
    width: 40px;
  }
`;

export default {
  Summary,
  Title,
  Formats,
  Format
};
