import styled from 'styled-components';

const onMobileView = '@media (max-width: 991px)';

const Summary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 40px;
  ${onMobileView} {
    flex-direction: column;
  }
`;

const Title = styled.h4`
  flex: 1;
  margin: 0;
  font-size: 1.6rem;
  font-weight: 600;
  color: ${({ theme }) => theme.extendedColors.textDefault};
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Formats = styled.div`
  display: flex;
  margin-left: 12px;

  ${onMobileView} {
    margin: 12px 0 0 0;
  }
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
