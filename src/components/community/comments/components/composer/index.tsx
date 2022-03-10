import React, { FC, memo, useRef } from 'react';
import { compose } from 'redux';

import TurndownService, { Node } from 'turndown';
import { Variant } from '@fellesdatakatalog/button';
import SC from './styled';
import Buttons from '../buttons/styled';
import translations from '../../../../../lib/localization';
import LogOut from '../logOut';

const htmlToMarkdown = new TurndownService();

htmlToMarkdown.addRule('images', {
  filter: 'img',
  replacement: (content: string, node: Node) => {
    if (node instanceof HTMLElement && node.className.includes('emoji')) {
      return node.getAttribute('alt') ?? '';
    }

    if (node instanceof HTMLElement) {
      return `![${node.getAttribute('alt')}](${node.getAttribute('src')})`;
    }

    return content;
  }
});

interface composerTools {
  icon: React.ReactElement;
  hint: string;
  value: string;
  left: string;
  right: string;
}

const tools: composerTools[] = [
  {
    icon: <SC.BoldIcon />,
    hint: translations.community.composer.tools.modificationAlt.bold,
    value: translations.community.composer.tools.modification.bold.value,
    left: translations.community.composer.tools.modification.bold.left,
    right: translations.community.composer.tools.modification.bold.right
  },
  {
    icon: <SC.ItalicIcon />,
    hint: translations.community.composer.tools.modificationAlt.italic,
    value: translations.community.composer.tools.modification.italic.value,
    left: translations.community.composer.tools.modification.italic.left,
    right: translations.community.composer.tools.modification.italic.right
  },
  {
    icon: <SC.BulletListIcon />,
    hint: translations.community.composer.tools.modificationAlt.ul,
    value: translations.community.composer.tools.modification.ul.value,
    left: translations.community.composer.tools.modification.ul.left,
    right: translations.community.composer.tools.modification.ul.right
  },

  {
    icon: <SC.StrikethroughIcon />,
    hint: translations.community.composer.tools.modificationAlt.strikethrough,
    value:
      translations.community.composer.tools.modification.strikethrough.value,
    left: translations.community.composer.tools.modification.strikethrough.left,
    right:
      translations.community.composer.tools.modification.strikethrough.right
  },
  {
    icon: <SC.CodeIcon />,
    hint: translations.community.composer.tools.modificationAlt.code,
    value: translations.community.composer.tools.modification.code.value,
    left: translations.community.composer.tools.modification.code.left,
    right: translations.community.composer.tools.modification.code.right
  },
  {
    icon: <SC.ImageIcon />,
    hint: translations.community.composer.tools.modificationAlt.image,
    value: translations.community.composer.tools.modification.image.value,
    left: translations.community.composer.tools.modification.image.left,
    right: translations.community.composer.tools.modification.image.right
  },
  {
    icon: <SC.LinkIcon />,
    hint: translations.community.composer.tools.modificationAlt.link,
    value: translations.community.composer.tools.modification.link.value,
    left: translations.community.composer.tools.modification.link.left,
    right: translations.community.composer.tools.modification.link.right
  },
  {
    icon: <SC.UserIcon />,
    hint: translations.community.composer.tools.modificationAlt.tag,
    value: translations.community.composer.tools.modification.tag.value,
    left: translations.community.composer.tools.modification.tag.left,
    right: translations.community.composer.tools.modification.tag.right
  }
];

interface ExternalProps {
  onSubmit: (content: string) => void;
  openToggle: () => void;
  initialValue?: string;
  showLogout?: boolean;
}

const CommentComposer: FC<ExternalProps> = ({
  onSubmit,
  openToggle,
  initialValue,
  showLogout
}) => {
  const commentContentFieldRef = useRef<HTMLTextAreaElement>(null);

  const applyTextModification = (
    selectionStart: number,
    selectionEnd: number,
    modification: string,
    leftModification: string,
    rightModification: string
  ) => {
    const currentValue = commentContentFieldRef.current?.value ?? '';
    if (selectionStart === selectionEnd) {
      commentContentFieldRef.current!.value = currentValue + modification;
    } else {
      commentContentFieldRef.current!.value =
        currentValue.slice(0, selectionStart) +
        leftModification +
        currentValue.slice(selectionStart, selectionEnd) +
        rightModification +
        currentValue.slice(selectionEnd, currentValue.length);
    }
  };

  return (
    <SC.PostCommentContainer>
      <SC.ComposerHeader>
        <SC.ToolsContainer>
          {tools.map(tool => (
            <SC.ToolButton
              value={tool.hint}
              key={`composer-tool-${tool.hint}`}
              onClick={() =>
                applyTextModification(
                  commentContentFieldRef?.current?.selectionStart ?? 0,
                  commentContentFieldRef?.current?.selectionEnd ?? 0,
                  tool.value,
                  tool.left,
                  tool.right
                )
              }
            >
              {tool.icon}
            </SC.ToolButton>
          ))}
        </SC.ToolsContainer>
        {!!showLogout && <LogOut />}
      </SC.ComposerHeader>
      <textarea
        ref={commentContentFieldRef}
        placeholder={translations.community.composer.placeholder}
      >
        {htmlToMarkdown.turndown(initialValue ?? '')}
      </textarea>
      <SC.PostCommentButtons>
        <Buttons.BigButton
          variant={Variant.PRIMARY}
          onClick={() => {
            onSubmit(commentContentFieldRef.current!.value);
            commentContentFieldRef.current!.value = '';
            openToggle();
          }}
        >
          {translations.community.composer.send}
        </Buttons.BigButton>
        <Buttons.UnderlineButton
          variant={Variant.TERTIARY}
          onClick={() => {
            openToggle();
            commentContentFieldRef.current!.value = '';
          }}
        >
          {translations.community.composer.cancel}
        </Buttons.UnderlineButton>
      </SC.PostCommentButtons>
    </SC.PostCommentContainer>
  );
};

export default compose<FC<ExternalProps>>(memo)(CommentComposer);
