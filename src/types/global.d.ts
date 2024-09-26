export {};

declare global {
  interface Window {
    _sz: {
      push: (event: [string, string, string, string?]) => void;
    };
  }
}
