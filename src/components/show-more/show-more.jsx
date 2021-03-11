import React, { useRef, useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import localization from '../../lib/localization';
import './show-more.scss';

export const ShowMorePure = ({
  showMoreButtonText,
  showLessButtonText,
  children
}) => {
  const contentElement = useRef(null);

  const [showAll, setShowAll] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  const toggleShowAll = () => setShowAll(!showAll);

  function _renderContent(extraClass) {
    return (
      <div className={cx('fdk-ingress', extraClass)} ref={contentElement}>
        {children}
      </div>
    );
  }

  useLayoutEffect(() => {
    if (contentElement.current) {
      setContentHeight(contentElement.current.getBoundingClientRect().height);
    }
  }, []);

  let content;
  if (!contentHeight) {
    // content height not measured, render with measuring box
    content = _renderContent('show-more__cropped-box-measure');
  } else if (contentHeight < 120) {
    // content height is under threshold
    content = _renderContent();
  } else if (showAll) {
    // content height is over threshold, uncollapsed view
    content = (
      <>
        {_renderContent()}
        <button
          type='button'
          className='fdk-button-small show-all'
          onClick={toggleShowAll}
        >
          <i className='fa mr-2 fa-angle-double-up' />
          <span>{showLessButtonText || localization.showLess}</span>
        </button>
      </>
    );
  } else {
    // content height is over threshold, collapsed view
    content = (
      <>
        {_renderContent('show-more__cropped-box')}
        <button
          type='button'
          className='fdk-button-small show-all'
          onClick={toggleShowAll}
        >
          <i className='fa mr-2 fa-angle-double-down' />
          <span>{showMoreButtonText || localization.showMore}</span>
        </button>
      </>
    );
  }
  return <div className='mb-5'>{content}</div>;
};

ShowMorePure.defaultProps = {
  showMoreButtonText: '',
  showLessButtonText: ''
};

ShowMorePure.propTypes = {
  showMoreButtonText: PropTypes.string,
  showLessButtonText: PropTypes.string
};

export const ShowMore = ShowMorePure;
