import { memo, FC } from 'react';

const SearchHitFormatsPure: FC<any> = ({ children }) => children;

export const SearchHitFormats = memo(SearchHitFormatsPure);
