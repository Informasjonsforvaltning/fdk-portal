// eslint-disable-next-line @typescript-eslint/no-var-requires
const React = require('react') as typeof import('react');

// Lightweight polyfill for React.useId in React 17
// Generates a stable id per component instance
let __reactUseIdCounter = 0;

if (typeof (React as any).useId !== 'function') {
  (React as any).useId = function useIdPolyfill(): string {
    // Use lazy initializer to ensure stable value across renders
    const [id] = React.useState(() => `rid-${++__reactUseIdCounter}`);
    return id;
  };
}

export {};


