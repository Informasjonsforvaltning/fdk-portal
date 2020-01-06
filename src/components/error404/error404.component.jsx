import React from 'react';
import './error.scss';

export const Error404 = () => (
  <div className="container error-container">
    <div className="error pt-5 text-center">
      <h1>404</h1>
      <p className="lead">
        Oi, dette er flaut! Det ser ut til at vi har rotet det til for deg...
        <br />
        Gå <a href="/">tilbake til forsiden</a>.
      </p>
    </div>
  </div>
);
