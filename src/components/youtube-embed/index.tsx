import React from 'react';
import SC from './styled';

interface Props {
  url: string | undefined | null;
  width?: string;
  height?: string;
}

const YOUTUBE_PATTERN =
  /(?:youtu\.be\/|youtube(?:-nocookie|education)?\.com\/(?:embed\/|v\/|watch\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))((\w|-){11})|youtube\.com\/playlist\?list=|youtube\.com\/user\//;

const YoutubeEmbed = ({ url, width = '853', height = '480' }: Props) => {
  const embedId = url?.match(YOUTUBE_PATTERN)?.[1];

  return (
    <SC.YoutubeEmbed>
      {embedId ? (
        <SC.Iframe
          width={width}
          height={height}
          src={`https://www.youtube.com/embed/${embedId}`}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          title='Embedded youtube'
        />
      ) : (
        'No video found'
      )}
    </SC.YoutubeEmbed>
  );
};

export default YoutubeEmbed;
