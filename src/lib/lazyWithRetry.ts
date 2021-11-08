import { lazy, LazyExoticComponent } from 'react';

const lazyWithRetry = (
  componentImport: () => Promise<any>
): LazyExoticComponent<any> =>
  lazy(async () => {
    try {
      const component = await componentImport();

      return component;
    } catch (error: any) {
      if (error?.name === 'ChunkLoadError') {
        return window.location.reload();
      }
      return error;
    }
  });

export default lazyWithRetry;
