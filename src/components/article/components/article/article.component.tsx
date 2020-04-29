import React, { FC, memo } from 'react';
import Moment from 'react-moment';

import SC from './styled';
import { convertToSanitizedHtml } from '../../../../lib/markdown-converter';
import { getTranslateText } from '../../../../lib/translateText';
import localization from '../../../../lib/localization';
import {
  getParagraphBodyValue,
  getParagraphImage,
  getParagraphVideoValue
} from '../../../../lib/drupal/drupal-values';
import NewsList from '../../../news-list/news-list-component';
import VimeoVideo from '../vimeo-video/vimeo-video.component';
import {
  PARAGRAPH__BODY,
  PARAGRAPH__IMAGE,
  PARAGRAPH__VIDEO
} from '../../../../constants/constants';

interface Props {
  publishedDate: string;
  title: string;
  abstract: string;
  field_modules: any;
  relatedNews: any;
}

export const renderFieldModule = (fieldModule: any) => {
  switch (fieldModule.type) {
    case PARAGRAPH__BODY:
      return (
        <SC.Body
          key={fieldModule.id}
          dangerouslySetInnerHTML={{
            __html: convertToSanitizedHtml(getParagraphBodyValue(fieldModule))
          }}
        />
      );
    case PARAGRAPH__IMAGE: {
      const image = getParagraphImage(fieldModule);
      return (
        <SC.FullWidthImage
          key={fieldModule.id}
          alt={image.meta.alt}
          src={image?.download_urls?.canonical}
        />
      );
    }
    case PARAGRAPH__VIDEO:
      return (
        <VimeoVideo
          key={fieldModule.id}
          videoLinkValue={getParagraphVideoValue(fieldModule)}
        />
      );
    default:
      return null;
  }
};

const Article: FC<Partial<Props>> = ({
  publishedDate,
  title,
  abstract,
  field_modules,
  relatedNews
}) => (
  <main id="content" className="container">
    <SC.Article>
      <div className="row">
        <div className={relatedNews ? 'col-12 col-lg-8' : 'col-12'}>
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
          {field_modules?.map((fieldModule: any) =>
            renderFieldModule(fieldModule)
          )}
        </div>
        {relatedNews && (
          <aside className="col-12 col-lg-4">
            <SC.AsideContent>
              <NewsList news={relatedNews} />
            </SC.AsideContent>
          </aside>
        )}
      </div>
    </SC.Article>
  </main>
);

export default memo(Article);
