import React from 'react';
import DocumentMeta from 'react-document-meta';

import localization from '../../lib/localization';

export const AboutPage = () => {
  const meta = {
    title: `Om ${localization.about.title}`,
    description: localization.about.ingress
  };
  return (
    <div className="container">
      <DocumentMeta {...meta} />
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h1 className="title">{localization.about.title}</h1>
          <div className="mb-2">
            <p className="fdk-ingress">{localization.about.titleSub}</p>
            <p className="fdk-ingress">{localization.about.ingress}</p>
          </div>
          <div className="fdk-textregular">
            <p
              dangerouslySetInnerHTML={{ __html: localization.about.maintext }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
