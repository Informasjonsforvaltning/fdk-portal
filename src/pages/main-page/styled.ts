import styled from 'styled-components';

const Content = styled.div`
  display: flex;
  margin-top: 2em;
  @media (min-width: 992px) {
    flex-direction: row-reverse;
    margin-top: 4em;
  }
`;

const Twitter = styled.div`
  background-color: #fff;
  border-radius: 5px;
  margin-top: 3em;
  padding: 2em 2em;

  & > h2 {
    font-size: 2.4rem;
    font-weight: 600;
  }
`;

const CommunityPosts = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2em;
`;

export default { Content, Twitter, CommunityPosts };
