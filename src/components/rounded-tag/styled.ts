import styled from 'styled-components';
import { Link } from 'react-router-dom';

const RoundedTag = styled(Link)`
    align-items: center;
    border-radius: .9em;
    border: none;
    display: flex;
    padding: .3em .6em;
  }
`;

export default { RoundedTag };
