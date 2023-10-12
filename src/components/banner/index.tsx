import React from 'react';
import type { FC } from 'react';
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
      <h1>{title}</h1>
    </SC.TitleContainer>
    <div>
      <RectangleSVG />
    </div>
  </SC.Container>
);

export default Banner;
