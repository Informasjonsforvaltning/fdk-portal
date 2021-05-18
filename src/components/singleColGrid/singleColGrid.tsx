import React, { FC, Fragment } from 'react';

interface Props {
  title?: string;
  items: any[];
}

export const SingleColGrid: FC<Props> = ({ title, items }) => (
  <section className='mb-5 list-type1' title={title}>
    <div>
      <h3>{title}</h3>
    </div>
    <hr />
    {items?.map((item, index) => (
      <Fragment key={index}>
        {index > 0 ? '<hr />' : ''}
        <div>
          <span>{item}</span>
        </div>
      </Fragment>
    ))}
  </section>
);
