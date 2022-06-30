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
import NewsList from '../../components/news-list/news-list-component';
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
          <section className='col-12 col-lg-4'>
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
                  <ContainerFooter href={`${FDK_COMMUNITY_BASE_URI}/recent`}>
                    {localization.community.seeMore}
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
                    {localization.community.seeMore}
                  </ContainerFooter>
                </SC.CommunityPosts>
              ) : null}
            </CommunityContainer>

            <HeaderSC.Header>{localization.news}</HeaderSC.Header>
            <NewsList news={news} />
          </section>
        </SC.Content>
      </main>
    </div>
  );
};

export default memo(MainPage);
