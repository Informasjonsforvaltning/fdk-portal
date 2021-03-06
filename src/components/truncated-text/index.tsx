import React, {
  FC,
  PropsWithChildren,
  useState,
  useRef,
  useEffect
} from 'react';

import useResize from './hooks';

import translations from '../../lib/localization';

import SC from './styled';

import { Entity } from '../../types/enums';

interface Props {
  visibleLines: number;
  lineHeight: number;
  entityTheme?: Entity;
}

const TruncatedText: FC<PropsWithChildren<Props>> = ({
  visibleLines,
  lineHeight,
  entityTheme,
  children
}) => {
  const [expanded, setExpanded] = useState(false);
  const [truncate, setTruncated] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const { height } = useResize(ref);

  useEffect(() => {
    setTruncated(height / lineHeight > visibleLines + 3);
  }, [height]);

  return (
    <SC.TruncateContainer>
      <SC.TextContent
        ref={ref}
        lineHeight={lineHeight}
        truncate={truncate && !expanded}
        visibleLines={visibleLines + 1}
        entity={entityTheme}
      >
        {children}
      </SC.TextContent>
      {truncate && (
        <SC.ExpandButton
          onClick={() => setExpanded(!expanded)}
          open={expanded}
          entity={entityTheme}
        >
          {translations.truncatedText[expanded ? 'expanded' : 'collapsed']}
        </SC.ExpandButton>
      )}
    </SC.TruncateContainer>
  );
};

export default TruncatedText;
