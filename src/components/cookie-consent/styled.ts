import styled from 'styled-components';

const Banner = styled.section`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #ffffff;
  border-top: 1px solid #c9ced1;
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.12);
  max-height: 100vh;
  overflow-y: auto;
`;

const Inner = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 400px) {
    padding: 1.5rem;
  }
`;

const Heading = styled.h2`
  margin: 0;
  font-size: 1.25rem;
`;

const Text = styled.p`
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export default { Banner, Inner, Heading, Text, Actions };
