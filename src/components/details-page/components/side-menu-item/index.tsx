import { memo, FC, PropsWithChildren } from 'react';

const SideMenuItem: FC<PropsWithChildren<any>> = ({ children }) => children;

export default memo(SideMenuItem);
