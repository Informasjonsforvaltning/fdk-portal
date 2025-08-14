import React, { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
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
      <Helmet>
        <title>
          {article?.title
            ? `${article.title} - data.norge.no`
            : `${localization.head.title} - data.norge.no`}
        </title>
        <meta
          name='description'
          content={
            article?.content
              ? article.content.substring(0, 160)
              : localization.head.description
          }
        />
        <meta
          property='og:title'
          content={
            article?.title
              ? `${article.title} - data.norge.no`
              : `${localization.head.title} - data.norge.no`
          }
        />
        <meta
          property='og:description'
          content={
            article?.content
              ? article.content.substring(0, 160)
              : localization.head.description
          }
        />
        <meta property='og:type' content='article' />
        {article?.publishedAt && (
          <meta
            property='article:published_time'
            content={article.publishedAt}
          />
        )}
        {article?.updatedAt && (
          <meta property='article:modified_time' content={article.updatedAt} />
        )}
      </Helmet>
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
