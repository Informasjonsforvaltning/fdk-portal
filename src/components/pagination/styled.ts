import styled from 'styled-components';
import ArrowRightIconBase from '@fellesdatakatalog/icons/assets/svg/arrow-right-stroke.svg';
import ArrowLeftIconBase from '@fellesdatakatalog/icons/assets/svg/arrow-left-stroke.svg';

const ArrowRightIcon = styled(ArrowRightIconBase)`
  & * {
    stroke: #0069a5;
  }
`;

const ArrowLeftIcon = styled(ArrowLeftIconBase)`
  & * {
    stroke: #0069a5;
  }
`;

export default { ArrowRightIcon, ArrowLeftIcon };
