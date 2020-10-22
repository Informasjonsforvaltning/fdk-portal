import {
  GET_CMS_ARTICLE_REQUESTED,
  GET_CMS_ARTICLE_SUCCEEDED,
  GET_CMS_ARTICLE_FAILED
} from './action-types';

import { News } from '../../../types';

export function getCmsArticleRequested(id: string) {
  return {
    type: GET_CMS_ARTICLE_REQUESTED,
    payload: {
      id
    }
  };
}

export function getCmsArticleSucceeded(article: News) {
  return {
    type: GET_CMS_ARTICLE_SUCCEEDED,
    payload: {
      article
    }
  };
}

export function getCmsArticleFailed(message: string) {
  return {
    type: GET_CMS_ARTICLE_FAILED,
    payload: {
      message
    }
  };
}
