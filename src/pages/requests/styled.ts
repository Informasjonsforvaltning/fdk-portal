import styled from 'styled-components';
import ArrowRightIconBase from '@fellesdatakatalog/icons/assets/svg/arrow-right-stroke.svg';
import ArrowLeftIconBase from '@fellesdatakatalog/icons/assets/svg/arrow-left-stroke.svg';
import ChevronDown from '@fellesdatakatalog/icons/assets/svg/chevron-double-down-stroke.svg';
import ChevronUp from '@fellesdatakatalog/icons/assets/svg/chevron-double-up-stroke.svg';

const RequestRow = styled.div`
  display: flex;
  background-color: white;
  width: 100%;
  height: 90px;
  margin-bottom: 10px;
  border-radius: 8px;
  border: solid 1px #d5d7d9;
  padding-left: 37px;
  padding-right: 37px;
  align-items: center;
  font-size: 18px;
`;

const RequestsTitleRow = styled.div`
  background-color: #d2eafd;
  height: 57px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding-left: 37px;
  padding-right: 37px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const RequestTitle = styled.div`
  width: 50%;
  font-weight: bold;
`;
const RequestLink = styled.a`
  width: 50%;
  font-weight: bold;
  text-decoration: underline;
  color: #111 !important;
`;

const RequestInfo = styled.div`
  width: 16%;
  display: flex;
  justify-content: center;
`;

const InfoText = styled.div`
  display: flex;
  max-width: 50%;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const FirstRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 17px;
`;

const Row = styled.div`
  display: flex;
`;

const Button = styled.div`
  height: fit-content;
  width: fit-content;
  padding-bottom: 20px;
  padding-top: 20px;
`;

const InfoBox = styled.div`
  padding-top: 37px;
`;

const Text = styled.div`
  padding-bottom: 20px;

  & > h3 {
    font-size: 24px;
  }
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

const ChevronDownIcon = styled(ChevronDown)`
  width: 16px;
  height: 16px;
  margin-left: 0.25em;
  & * {
    stroke: #fff;
  }
`;

const ChevronUpIcon = styled(ChevronUp)`
  width: 16px;
  height: 16px;
  margin-left: 0.25em;
  & * {
    stroke: #fff;
  }
`;

const Pagination = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > ul {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & > ul > li {
    padding: 10px;
  }
`;

const Banner = styled.div`
  padding-top: 20px;
`;

export default {
  RequestRow,
  RequestsTitleRow,
  RequestTitle,
  RequestInfo,
  RequestLink,
  InfoText,
  Row,
  Button,
  InfoBox,
  Text,
  FirstRow,
  ArrowLeftIcon,
  ArrowRightIcon,
  Pagination,
  Banner,
  ChevronDownIcon,
  ChevronUpIcon
};
