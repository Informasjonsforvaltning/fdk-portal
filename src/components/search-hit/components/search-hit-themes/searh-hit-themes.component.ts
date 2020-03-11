import { memo, FC } from 'react';

const SearchHitThemesPure: FC<any> = ({ children }) => children;

export const SearchHitThemes = memo(SearchHitThemesPure);
