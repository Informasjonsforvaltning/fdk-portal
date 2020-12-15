import React, { FC, memo, useEffect } from 'react';

import SC from './styled';
import localization from '../../lib/localization';
import {
  SearchBox,
  SearchBoxTitle,
  SearchLink
} from '../../components/search-box/search-box';
import HeaderSC from './components/header/styled';
import NewsList from '../../components/news-list/news-list-component';
import SearchEntities from '../../components/search-entities/search-entities.component';
import { Props as EntitiesProps } from '../../components/with-entities';
import { Props as ReferenceDataProps } from '../../components/with-reference-data';
import { Entity } from '../../types/enums';
import { getConfig } from '../../config';

interface Props extends EntitiesProps, ReferenceDataProps {
  news?: any;
}

const MainPage: FC<Props> = ({
  news,
  entities,
  entitiesActions: { getEntitiesRequested: getEntities },
  referenceData: { los },
  referenceDataActions: { getReferenceDataRequested: getReferenceData }
}) => {
  useEffect(() => {
    getEntities();

    if (!los) {
      getReferenceData('los');
    }
  }, []);

  return (
    <div>
      <SearchBox>
        <SearchBoxTitle large>{localization.searchBoxHeader}</SearchBoxTitle>
        <SearchLink entity={Entity.DATASET} />
        <SearchLink entity={Entity.DATA_SERVICE} />
        <SearchLink entity={Entity.CONCEPT} />
        <SearchLink entity={Entity.INFORMATION_MODEL} />
        <SearchLink entity={Entity.PUBLIC_SERVICE} beta />
      </SearchBox>
      <main id="content" className="container">
        <SC.Content className="row">
          <section className="col-12 col-lg-8">
            <HeaderSC.Header>
              <span>{localization.sort.modified}</span>
            </HeaderSC.Header>
            <SearchEntities entities={entities} losItems={los} />
          </section>
          <section className="col-12 col-lg-4">
            <HeaderSC.Header>
              <span>{localization.news}</span>
            </HeaderSC.Header>

            <NewsList news={news} />

            {!getConfig().themeNap && (
              <SC.Twitter>
                <h2>{localization.newsFromDatakatalogenOnTwitter}</h2>
                <a
                  className="twitter-timeline"
                  data-width="600"
                  data-height="500"
                  href="https://twitter.com/datakatalogen?ref_src=twsrc%5Etfw"
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
