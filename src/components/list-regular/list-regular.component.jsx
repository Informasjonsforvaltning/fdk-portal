import React from 'react';
import PropTypes from 'prop-types';
import './list-regular.scss';

export const ListRegular = ({ title, name, bottomMargin, children }) => {
  return (
    <section
      className={`list-regular ${bottomMargin ? 'mb-5' : ''}`}
      name={name || title}
    >
      {title && (
        <div className='list-regular--item'>
          <h3>{title}</h3>
        </div>
      )}
      {children}
    </section>
  );
};

ListRegular.defaultProps = {
  title: null,
  name: null,
  children: null,
  bottomMargin: true
};

ListRegular.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  bottomMargin: PropTypes.bool
};
