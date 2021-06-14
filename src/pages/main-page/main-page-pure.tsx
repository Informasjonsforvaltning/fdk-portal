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
import { CommunityTerm, Entity } from '../../types/enums';
import { getConfig } from '../../config';
import Post from '../../components/community/post';

const { FDK_COMMUNITY_BASE_URI } = env;

interface Props extends EntitiesProps, ReferenceDataProps, CommunityProps {
  news?: any;
}

const MainPage: FC<Props> = ({
  news,
  entities,
  posts,
  entitiesActions: { getEntitiesRequested: getEntities },
  referenceData: { mediatypes: mediaTypes },
  referenceDataActions: { getReferenceDataRequested: getReferenceData },
  communityActions: { getRecentPostsRequested: getRecentPosts, resetPosts }
}) => {
  useEffect(() => {
    if (!mediaTypes) {
      getReferenceData('mediatypes');
    }

    getRecentPosts(CommunityTerm.ALL);
    getEntities();
    return () => {
      resetPosts();
    };
  }, []);

  return (
    <div>
      <SearchBox>
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
            <HeaderSC.Header>
              <span>{localization.sort.modified}</span>
            </HeaderSC.Header>
            <SearchEntities entities={entities} mediatypes={mediaTypes} />
          </section>
          <section className='col-12 col-lg-4'>
            <HeaderSC.Header>
              <span>{localization.community.title}</span>
            </HeaderSC.Header>
            {posts.length > 0 ? (
              <SC.CommunityPosts>
                {posts.slice(0, 3).map(post => (
                  <Post post={post} />
                ))}
                <SC.Link href={`${FDK_COMMUNITY_BASE_URI}/recent`}>
                  {localization.community.seeMore}
                </SC.Link>
              </SC.CommunityPosts>
            ) : null}
            <HeaderSC.Header>
              <span>{localization.news}</span>
            </HeaderSC.Header>

            <NewsList news={news} />

            {!getConfig().themeNap && (
              <SC.Twitter>
                <h2>{localization.newsFromDatakatalogenOnTwitter}</h2>
                <a
                  className='twitter-timeline'
                  data-width='600'
                  data-height='500'
                  href='https://twitter.com/datakatalogen?ref_src=twsrc%5Etfw'
                >
                  Tweets by datakatalogen
                </a>
              </SC.Twitter>
            )}
          </section>
        </SC.Content>
      </main>
    </div>
  );
};

export default memo(MainPage);
