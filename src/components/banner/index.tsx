import React from 'react';
import type { FC } from 'react';
import { Heading } from '@digdir/design-system-react';
import SC from './styled';

import EllipseSVG from './svg/ellipse-1.svg';
import RectangleSVG from './svg/rectangle-1.svg';

interface Props {
  title: string;
}

const Banner: FC<Props> = ({ title }) => (
  <SC.Container>
    <SC.SvgEllipse>
      <EllipseSVG />
    </SC.SvgEllipse>
    <SC.TitleContainer>
      <Heading size='xlarge'>{title}</Heading>
    </SC.TitleContainer>
    <SC.SvgRectangle>
      <RectangleSVG />
    </SC.SvgRectangle>
  </SC.Container>
);

export default Banner;
