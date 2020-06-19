import styled from 'styled-components';

const Summary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 40px;
`;

const Title = styled.h4`
  flex: 1;
  margin: 0;
  line-height: 1.5;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.extendedColors.textDefault};
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
