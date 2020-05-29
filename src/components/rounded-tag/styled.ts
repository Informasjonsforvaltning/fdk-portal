import styled from 'styled-components';
import { Link } from 'react-router-dom';

const RoundedTagWithLink = styled(Link)`
    align-items: center;
    border-radius: 20px;
    border: none;
    display: flex;
    padding: .3em .6em;
  }
`;

const RoundedTag = styled.div`
    align-items: center;
    border-radius: 20px;
    border: none;
    display: flex;
    padding: .3em .6em;
  }
`;

export default { RoundedTagWithLink, RoundedTag };
