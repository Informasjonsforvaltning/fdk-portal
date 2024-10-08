import React, { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import { compose } from 'redux';
import Moment from 'react-moment';
import { Article, useGetArticleQuery } from '../../api/generated/cms/graphql';
import ErrorPage from '../error-page';
import withErrorBoundary from '../../components/with-error-boundary';
import localization from '../../lib/localization';
import SC from '../../components/article/styled';
import Markdown from '../../components/markdown';
import { getLocalizedAttributes } from '../../lib/strapi';

const NewsArticlePage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading } = useGetArticleQuery({
    variables: { id }
  });

  if (loading) {
    return <div>Laster</div>;
  }

  if (!data || !data.article) {
    return <div>404</div>;
  }

  const article = getLocalizedAttributes<Article>(
    data.article as Article,
    localization.getLanguage()
  );

  return (
    <main id='content' className='container'>
      <SC.Article>
        <div className='row'>
          <div className='col-12'>
            {article?.publishedAt && (
              <SC.Date>
                <span>{localization.published} </span>
                <Moment format='DD.MM.YYYY'>{article?.publishedAt}</Moment>
                {article?.updatedAt && (
                  <>
                    <span>
                      &nbsp;{' / '}
                      {localization.lastChanged}{' '}
                    </span>
                    <Moment format='DD.MM.YYYY'>{article?.updatedAt}</Moment>
                  </>
                )}
              </SC.Date>
            )}

            {article?.title && <SC.Title>{article?.title}</SC.Title>}

            {article?.content && (
              <SC.Body>
                <Markdown>{article.content}</Markdown>
              </SC.Body>
            )}
          </div>
        </div>
      </SC.Article>
    </main>
  );
};

const enhance = compose(withErrorBoundary(ErrorPage));
export const NewsArticlePageV2 = enhance(memo(NewsArticlePage));
