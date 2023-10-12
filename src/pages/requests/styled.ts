import styled from 'styled-components';

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

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.div`
  height: fit-content;
  display: flex;
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
  Text
};
