import React from 'react';

// Create a mock SVG component that styled-components can work with
const SvgMock = React.forwardRef((props, ref) =>
  React.createElement('svg', { ...props, ref })
);

export default SvgMock;
