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
  onlyTruncate?: boolean;
  isTruncated?: boolean;
}

const TruncatedText: FC<PropsWithChildren<Props>> = ({
  visibleLines,
  lineHeight,
  onlyTruncate,
  entityTheme,
  children,
  isTruncated = false
}) => {
  const [expanded, setExpanded] = useState(false);
  const [truncate, setTruncated] = useState(isTruncated);

  const ref = useRef<HTMLDivElement>(null);
  const { height } = useResize(ref);

  useEffect(() => {
    setTruncated(height / lineHeight > visibleLines + 3);
  }, [height]);

  return (
    <SC.TruncateContainer>
      <SC.TextContainer
        lineHeight={lineHeight}
        visibleLines={visibleLines}
        truncate={isTruncated || (truncate && !expanded)}
      >
        <SC.TextContent
          ref={ref}
          lineHeight={lineHeight}
          truncate={isTruncated || (truncate && !expanded)}
          visibleLines={visibleLines}
          entity={entityTheme}
        >
          {children}
        </SC.TextContent>
      </SC.TextContainer>
      {truncate && !onlyTruncate && (
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
