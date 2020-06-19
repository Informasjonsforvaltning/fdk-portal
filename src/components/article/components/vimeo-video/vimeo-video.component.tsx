import React, { FC, memo, useEffect, useState } from 'react';

import SC from './styled';
import { getVimeoData } from '../../../../api/vimeo/host';

interface Props {
  videoLinkValue: string;
}

const VimeoVideo: FC<Props> = ({ videoLinkValue }) => {
  const [vimeoData, setVimeoData] = useState<any>();
  useEffect(() => {
    if (videoLinkValue) {
      getVimeoData(videoLinkValue).then(setVimeoData);
    }
  }, []);

  return <SC.Video dangerouslySetInnerHTML={{ __html: vimeoData?.html }} />;
};

export default memo(VimeoVideo);
