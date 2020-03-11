import { memo, FC } from 'react';

const SearchHitDataPure: FC<any> = ({ children }) => children;

export const SearchHitData = memo(SearchHitDataPure);
