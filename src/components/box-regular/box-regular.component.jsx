import React from 'react';
import PropTypes from 'prop-types';
import './box-regular.scss';
import { insertTestId, testIds } from '../../../test/utils/testIds';

export const BoxRegular = props => {
  const { title, subText } = props;
  return (
    <div
      className="box-regular flex-grow-1"
      {...insertTestId(testIds.boxRegular.component)}
    >
      <div className="fdk-text-strong">{title}</div>
      <div>{subText}</div>
    </div>
  );
};

BoxRegular.defaultProps = {
  title: null,
  subText: null
};

BoxRegular.propTypes = {
  title: PropTypes.string,
  subText: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};
