import '@digdir/design-system-tokens/brand/digdir/tokens.css';
import {
  Pagination as DSPagination,
  UsePaginationProps,
  usePagination
} from '@digdir/design-system-react';
import cn from 'classnames';
import React from 'react';
import localization from '../../lib/localization';
import { getPath } from '../../pages/search-page/search-location-helper';
import SC from './styled';

interface Props {
  onChange(selectedItem: number): void;
  totalPages: number;
  currentPage: number;
  className?: string;
}

interface LinkProps {
  totalPages: number;
  currentPage: number;
  className?: string;
  location: any;
  history: any;
}

const Pagination = ({
  onChange,
  totalPages,
  currentPage,
  className
}: Props) => (
  <DSPagination
    size='large'
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

const LinkPagination: React.FC<LinkProps> = ({
  totalPages,
  currentPage,
  className,
  history,
  location
}) => {
  const paginationObject: UsePaginationProps = {
    currentPage: currentPage + 1,
    totalPages
  };

  const paginationParams = usePagination(paginationObject);
  const { pages } = paginationParams;

  return (
    <DSPagination.Root className={cn(className)} size='large'>
      <DSPagination.Content>
        {/* Previous page */}
        <DSPagination.Item>
          <DSPagination.Previous
            aria-label={localization.page.prev}
            asChild
            style={{
              visibility: paginationParams.showPreviousPage
                ? 'visible'
                : 'hidden'
            }}
          >
            <a href={getPath(history, location, currentPage - 1)}>
              <SC.ArrowLeftIcon />
              {localization.page.prev}
            </a>
          </DSPagination.Previous>
        </DSPagination.Item>

        {/* Pages */}
        {pages.map((page, index) =>
          page === 'ellipsis' ? (
            <DSPagination.Ellipsis key={index} />
          ) : (
            <DSPagination.Item key={index}>
              <DSPagination.Button
                aria-label={`${localization.page.navigateTo} ${page}`}
                asChild
                isActive={page === currentPage + 1}
                style={{
                  color: page === currentPage + 1 ? 'white' : ''
                }}
              >
                <a href={getPath(history, location, page - 1)}>{page}</a>
              </DSPagination.Button>
            </DSPagination.Item>
          )
        )}

        {/* Next page */}
        <DSPagination.Item>
          <DSPagination.Next
            aria-label={localization.page.next}
            asChild
            style={{
              visibility: paginationParams.showNextPage ? 'visible' : 'hidden'
            }}
          >
            <a href={getPath(history, location, currentPage + 1)}>
              {localization.page.next}
              <SC.ArrowRightIcon />
            </a>
          </DSPagination.Next>
        </DSPagination.Item>
      </DSPagination.Content>
    </DSPagination.Root>
  );
};

export { Pagination, LinkPagination };
