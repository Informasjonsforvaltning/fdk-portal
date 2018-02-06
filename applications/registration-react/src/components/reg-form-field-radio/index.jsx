import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const RadioField  = ({ input, label, radioId }) => (
  <div className="form-check fdk-form-check">
    <input {...input} type="radio" className="form-check-input" id={radioId} /* onChange={e => {e.preventDefault(); asyncValidate();}} */ />
    <label className="form-check-label fdk-form-check-label" htmlFor={radioId}>
      {label}
    </label>
  </div>
)

RadioField.defaultProps = {
  radioId: ''
};

RadioField.propTypes = {
  radioId: PropTypes.string
};

export default RadioField;
