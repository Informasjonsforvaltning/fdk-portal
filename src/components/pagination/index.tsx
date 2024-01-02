import '@digdir/design-system-tokens/brand/digdir/tokens.css';
import { Pagination as DSPagination } from '@digdir/design-system-react';
import cn from 'classnames';
import React from 'react';
import localization from '../../lib/localization';

interface Props {
  onChange(selectedItem: number): void;
  totalPages: number;
  currentPage: number;
  className?: string;
}

const Pagination = ({
  onChange,
  totalPages,
  currentPage,
  className
}: Props) => (
  <DSPagination
    className={cn(className)}
    currentPage={currentPage}
    totalPages={totalPages}
    onChange={onChange}
    nextLabel={localization.page.next}
    previousLabel={localization.page.prev}
    itemLabel={num => `${localization.page.navigation} ${num}}`}
    compact={false}
  />
);

export { Pagination };
