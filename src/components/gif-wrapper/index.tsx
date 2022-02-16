import React, { FC, memo, useState } from 'react';
import PauseIcon from '../animated-icons/pause-icon';
import PlayIcon from '../animated-icons/play-icon';

import translations from '../../lib/localization';

import SC from './styled';

interface Props {
  src: string;
  alt?: string;
  height: number;
  width: number;
}

const GifWrapper: FC<Props> = ({ src, alt, height, width }) => {
  const [hidden, setHidden] = useState(true);

  return (
    <SC.GifContainer
      height={height}
      width={width}
      $src={src}
      $showGif={!hidden}
    >
      <SC.AccessibleGif src={src} alt={alt} />

      {hidden ? (
        <SC.PlayButton onClick={() => setHidden(false)}>
          <PlayIcon />
          {translations.community.comments.gif.play}
        </SC.PlayButton>
      ) : (
        <SC.PauseButton onClick={() => setHidden(true)}>
          <PauseIcon />
          <span>{translations.community.comments.gif.pause}</span>
        </SC.PauseButton>
      )}
    </SC.GifContainer>
  );
};

export default memo<FC<Props>>(GifWrapper);
