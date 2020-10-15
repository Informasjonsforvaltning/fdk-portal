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

interface Props {
  content: string;
  visibleLines: number;
  lineHeight: number;
}

const TruncatedText: FC<PropsWithChildren<Props>> = ({
  content,
  visibleLines,
  lineHeight
}) => {
  const [expanded, setExpanded] = useState(false);
  const [truncate, setTruncated] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const { height } = useResize(ref);

  useEffect(() => {
    setTruncated(height / lineHeight > visibleLines);
  }, [height]);

  return (
    <div>
      <SC.TextContent
        ref={ref}
        lineHeight={lineHeight}
        truncate={truncate && !expanded}
        visibleLines={visibleLines + 1}
      >
        {content}
      </SC.TextContent>
      {truncate && (
        <SC.ExpandButton onClick={() => setExpanded(!expanded)} open={expanded}>
          {translations.truncatedText[expanded ? 'expanded' : 'collapsed']}
        </SC.ExpandButton>
      )}
    </div>
  );
};

export default TruncatedText;
