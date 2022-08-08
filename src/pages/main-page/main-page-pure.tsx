import React, { FC, memo, useEffect } from 'react';

import env from '../../env';
import SC from './styled';
import localization from '../../lib/localization';
import {
  SearchBox,
  SearchBoxHeader,
  SearchLink
} from '../../components/search-box/search-box';
import HeaderSC from './components/header/styled';
import SearchEntities from '../../components/search-entities/search-entities.component';
import { Props as EntitiesProps } from '../../components/with-entities';
import { Props as ReferenceDataProps } from '../../components/with-reference-data';
import { Props as CommunityProps } from '../../components/with-community';
import { CommunityTerm, Entity, Namespace } from '../../types/enums';
import Post from '../../components/community/post';
import CommunityContainer from '../../components/community/community-container';
import ContainerHeader from '../../components/community/container-header';
import ContainerFooter from '../../components/community/container-footer';
import Divider from '../../components/divider';
import NewsItem from '../../components/community/news-item';
import {
  PATHNAME_COMMUNITY_COMMENTS,
  PATHNAME_NEWS_ARCHIVE
} from '../../constants/constants';

const { FDK_COMMUNITY_BASE_URI, NAMESPACE } = env;

interface Props extends EntitiesProps, ReferenceDataProps, CommunityProps {
  news?: any;
}

const MainPage: FC<Props> = ({
  news,
  entities,
  posts,
  entitiesActions: { getEntitiesRequested: getEntities },
  communityActions: { getRecentPostsRequested: getRecentPosts, resetPosts }
}) => {
  const commentBotId = NAMESPACE === Namespace.DEVELOPMENT ? '1' : '373';
  const prunedPosts = posts.filter(post => `${post.uid}` !== commentBotId);

  useEffect(() => {
    getRecentPosts(CommunityTerm.ALL);
    getEntities();
    return () => {
      resetPosts();
    };
  }, []);

  return (
    <div>
      <SearchBox placeholder='Eksempel: kollektivtransport' autosuggest>
        <SearchBoxHeader as='h1' large>
          {localization.searchBoxHeader}
        </SearchBoxHeader>
        <SearchLink entity={Entity.DATASET} />
        <SearchLink entity={Entity.DATA_SERVICE} />
        <SearchLink entity={Entity.CONCEPT} />
        <SearchLink entity={Entity.INFORMATION_MODEL} />
        <SearchLink entity={Entity.PUBLIC_SERVICE} beta />
      </SearchBox>
      <main id='content' className='container'>
        <SC.Content className='row'>
          <section className='col-12 col-lg-8'>
            <HeaderSC.Header>{localization.sort.modified}</HeaderSC.Header>
            <SearchEntities entities={entities} />
          </section>
          <SC.Sidebar className='col-12 col-lg-4'>
            <CommunityContainer>
              <ContainerHeader>
                {`${localization.community.seeLatestComments} ${localization.community.title}`}
              </ContainerHeader>
              {prunedPosts.length > 0 ? (
                <SC.CommunityPosts>
                  {prunedPosts
                    .filter(({ isMainPost }) => !isMainPost)
                    .slice(0, 3)
                    .map(post => (
                      <>
                        <Post key={post.pid ?? post.uid} post={post} />
                        <Divider />
                      </>
                    ))}
                  <ContainerFooter
                    href={`${FDK_COMMUNITY_BASE_URI}${PATHNAME_COMMUNITY_COMMENTS}`}
                  >
                    {localization.community.seeAllComments}
                  </ContainerFooter>
                </SC.CommunityPosts>
              ) : null}
            </CommunityContainer>

            <CommunityContainer>
              <ContainerHeader>
                {`${localization.community.seeLatest} ${localization.community.title}`}
              </ContainerHeader>
              {prunedPosts.length > 0 ? (
                <SC.CommunityPosts>
                  {prunedPosts.slice(0, 3).map(post => (
                    <>
                      <Post key={post.pid ?? post.uid} post={post} />
                      <Divider />
                    </>
                  ))}
                  <ContainerFooter href={`${FDK_COMMUNITY_BASE_URI}/recent`}>
                    {localization.community.seeAllPosts}
                  </ContainerFooter>
                </SC.CommunityPosts>
              ) : null}
            </CommunityContainer>

            <CommunityContainer>
              <ContainerHeader>{localization.news}</ContainerHeader>
              {news.length > 0 ? (
                <SC.CommunityPosts>
                  {news.slice(0, 3).map((newsItem: any) => (
                    <>
                      <NewsItem {...newsItem} />
                      <Divider />
                    </>
                  ))}
                  <ContainerFooter href={PATHNAME_NEWS_ARCHIVE}>
                    {localization.community.seeAllBlogArticles}
                  </ContainerFooter>
                </SC.CommunityPosts>
              ) : null}
            </CommunityContainer>
          </SC.Sidebar>
        </SC.Content>
      </main>
    </div>
  );
};

export default memo(MainPage);
