import React, { FC, memo } from 'react';
import Moment from 'react-moment';

import SC from './styled';
import { convertToSanitizedHtml } from '../../../../lib/markdown-converter';
import { getTranslateText } from '../../../../lib/translateText';
import localization from '../../../../lib/localization';

interface Props {
  publishedDate: string;
  title: string;
  abstract: string;
  body: string;
  imageTop: any;
  vimeoData: any;
}

const Article: FC<Partial<Props>> = ({
  publishedDate,
  title,
  abstract,
  body,
  imageTop,
  vimeoData
}) => (
  <main id="content" className="container">
    <SC.Article>
      <div className="row">
        <div className="col-12 col-lg-8 offset-lg-2">
          {imageTop && (
            <SC.FullWidthImage
              alt={imageTop.meta.alt}
              src={imageTop?.download_urls?.canonical}
            />
          )}

          {publishedDate && (
            <SC.Date>
              {localization.published}{' '}
              <Moment format="DD.MM.YYYY">{publishedDate}</Moment>
            </SC.Date>
          )}

          {title && <SC.Title>{getTranslateText(title)}</SC.Title>}

          {abstract && (
            <SC.Abstract
              dangerouslySetInnerHTML={{
                __html: convertToSanitizedHtml(abstract)
              }}
            />
          )}
          {body && (
            <SC.Body
              dangerouslySetInnerHTML={{
                __html: convertToSanitizedHtml(body)
              }}
            />
          )}
          {vimeoData && (
            <SC.Video dangerouslySetInnerHTML={{ __html: vimeoData.html }} />
          )}
        </div>
      </div>
    </SC.Article>
  </main>
);

export default memo(Article);
