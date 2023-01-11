import React, { FC, PropsWithChildren, useEffect } from 'react';
import { Switch, useLocation } from 'react-router-dom';

interface Props {
  key: string;
}

const ScrollToTop: FC<PropsWithChildren<Props>> = ({ key, children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <Switch key={key}>{children}</Switch>;
};

export default ScrollToTop;
