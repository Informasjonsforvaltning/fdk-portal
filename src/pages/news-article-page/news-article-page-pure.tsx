import React, { FC, memo, useEffect, useState } from 'react';

import { News as NewsInterface } from '../../types';
import {
  getParagraphBodyValue,
  getParagraphImage,
  getParagraphVideoValue
} from '../../lib/drupal/drupal-values';
import Article from '../../components/article/components/article/article.component';
import { getVimeoData } from '../../api/vimeo/host';

interface Props {
  newsItem?: Partial<NewsInterface>;
}

const NewsArticlePage: FC<Props> = ({
  newsItem: { created, title, field_ingress, field_modules } = {}
}) => {
  const videoLinkValue = getParagraphVideoValue(field_modules);
  const [vimeoData, setVimeoData] = useState();

  useEffect(() => {
    if (videoLinkValue) {
      getVimeoData(videoLinkValue).then(setVimeoData);
    }
  }, []);

  return (
    <Article
      publishedDate={created}
      title={title}
      abstract={field_ingress}
      body={getParagraphBodyValue(field_modules)}
      imageTop={getParagraphImage(field_modules)}
      vimeoData={vimeoData}
    />
  );
};

export default memo(NewsArticlePage);
