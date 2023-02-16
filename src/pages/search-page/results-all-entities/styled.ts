import styled from 'styled-components';
import { Unit, theme } from '@fellesdatakatalog/theme';
import Link from '@fellesdatakatalog/link';
import ArrowRightIconBase from '@fellesdatakatalog/icons/assets/svg/arrow-right-stroke.svg';
import ArrowLeftIconBase from '@fellesdatakatalog/icons/assets/svg/arrow-left-stroke.svg';
import FeedSVG from '../../../images/icon-feed-sm.svg';

const Content = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const Filters = styled.aside``;

const SortButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media (min-width: 992px) {
    justify-content: flex-end;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FeedLinks = styled.span`
  display: flex;
`;

const FeedLink = styled(Link)`
  font-size: ${theme.fontSize('FS14', Unit.REM)};
  color: #0069a5 !important;

  &:nth-of-type(n + 2) {
    margin-left: ${theme.spacing('S8')};
  }
`;

const FeedIcon = styled(FeedSVG)`
  height: 11px;
  width: 11px;
  min-height: 11px;
  min-width: 11px;
  margin-left: ${theme.spacing('S4')};
`;

const ArrowRightIcon = styled(ArrowRightIconBase)`
  width: 16px;
  height: 16px;
  margin-left: 0.25em;
  & * {
    stroke: #0069a5;
  }
`;

const ArrowLeftIcon = styled(ArrowLeftIconBase)`
  width: 16px;
  height: 16px;
  margin-right: 0.25em;
  & * {
    stroke: #0069a5;
  }
`;

export default {
  Content,
  Filters,
  SortButtons,
  Pagination,
  FeedLinks,
  FeedLink,
  FeedIcon,
  ArrowRightIcon,
  ArrowLeftIcon
};
