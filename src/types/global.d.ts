export declare global {
  interface Window {
    monsido_functions: {
      trackEvent: (
        category: string,
        action: string,
        event: string,
        increaseBy: number
      ) => string;
    };
  }
}
