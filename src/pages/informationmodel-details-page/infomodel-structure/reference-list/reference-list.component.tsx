import React, { FC, memo } from 'react';
import Scroll from 'react-scroll';

import SC from './styled';
import { ObjectType } from '../../../../types';
import { getTranslateText } from '../../../../lib/translateText';
import ListTitleSC from '../list-title/styled';

interface Props {
  title: string;
  extendsFromList?: Partial<ObjectType>[];
  referenceList?: string[];
}

const ReferenceListPure: FC<Props> = ({
  title,
  extendsFromList,
  referenceList
}) => (
  <>
    {extendsFromList && extendsFromList.length > 0 && (
      <>
        <ListTitleSC.ListTitle>{title}</ListTitleSC.ListTitle>
        {extendsFromList.map(objectType => (
          <SC.Element key={objectType.id}>
            <Scroll.Link
              to={objectType.id || ''}
              spy
              smooth
              isDynamic
              offset={0}
              duration={1500}
            >
              <span>
                {getTranslateText(objectType?.modelDescription?.name)}
              </span>
            </Scroll.Link>
          </SC.Element>
        ))}
      </>
    )}

    {referenceList && referenceList.length > 0 && (
      <>
        <ListTitleSC.ListTitle>{title}</ListTitleSC.ListTitle>
        {referenceList.map((element, index) => (
          <SC.Element key={`${element}-${index}`}>
            <a href={element}>{element}</a>
          </SC.Element>
        ))}
      </>
    )}
  </>
);

export const ReferenceList = memo(ReferenceListPure);
