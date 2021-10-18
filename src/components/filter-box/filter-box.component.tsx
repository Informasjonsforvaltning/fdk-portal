import React from 'react';
import { Collapse } from 'reactstrap';
import _ from 'lodash';

import localization from '../../lib/localization';
import FilterSearchField from '../filter-search-field';
import { FilterOption } from '../filter-option/filter-option.component';
import './filter-box.scss';

import CollapseTextIcon from '../../img/icon-collapse-text-sm.svg';
import ExpandTextIcon from '../../img/icon-expand-text-sm.svg';

interface Props {
  htmlKey?: number;
  title?: string;
  filter: Record<string, any>;
  groupByPrefix?: string[];
  searchable?: boolean;
  onClick: (...args: any[]) => void;
  activeFilter?: any;
  referenceDataItems?: Record<string, any>;
  filters?: Record<string, any>;
  capitalizeOption?: boolean;
}

interface State {
  openFilter: boolean;
  open: boolean;
  filterSearch: string;
}

type BucketItem = {
  label?: string;
  key: string;
  count: number;
};

export class FilterBox extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      openFilter: true,
      open: false,
      filterSearch: ''
    };
    this.toggleFilter = this.toggleFilter.bind(this);
    this.toggleList = this.toggleList.bind(this);
    this.search = this.search.bind(this);
  }

  toggleFilter() {
    const { openFilter } = this.state;
    this.setState({ openFilter: !openFilter });
  }

  toggleList() {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  search(value: string) {
    this.setState({ filterSearch: value });
  }

  _renderOptions(
    { buckets }: any,
    onClick: any,
    activeFilter: any,
    allFilters: any,
    filterSearch: string,
    groupByPrefix: string[],
    capitalizeOption: any
  ) {
    const { open } = this.state;
    const { htmlKey, referenceDataItems } = this.props;
    const filters: any[] = [];
    if (activeFilter) {
      filters.push(...activeFilter.split(','));
    }
    if (allFilters && 'opendata' in allFilters) {
      filters.push('OPEN_DATA');
    }

    const defaultGroup = 'default';
    const groupByPrefixes = (data: BucketItem[]) => {
      const getGroup = (item: BucketItem, prefixes: string[]): string => {
        if (prefixes.length > 0) {
          return item.key.startsWith(prefixes[0])
            ? prefixes[0]
            : getGroup(item, prefixes.slice(1));
        }
        return defaultGroup;
      };

      return data.reduce((results: Record<string, BucketItem[]>, item) => {
        const group = getGroup(item, groupByPrefix);
        const label = item.key.replace(new RegExp(`${group}\\s?`), '');
        item.label = label || localization.facet.formatType.UNKNOWN;
        results[group] = results[group] || [];
        results[group].push(item);
        return results;
      }, {});
    };

    const options = (items: BucketItem[], groupIndex: number) =>
      items.map((item, index) => {
        // generate unique key, this is used by FilterOption on label htmlFor
        let itemKey = 0;
        if (htmlKey) {
          itemKey = Number.parseInt(`${htmlKey}${groupIndex}${index}`, 10);
        }
        let active = false;
        if (filters.includes(item.key)) {
          active = true;
        }

        return (
          <FilterOption
            key={itemKey}
            itemKey={itemKey}
            value={item.key}
            label={item.label ?? item.key}
            count={item.count}
            onClick={onClick}
            active={active}
            capitalize={capitalizeOption}
            referenceDataItems={referenceDataItems}
          />
        );
      });

    if (buckets) {
      return Object.entries(
        groupByPrefixes(
          buckets.filter(({ key }: any) =>
            key.toLowerCase().includes(filterSearch.toLowerCase())
          )
        )
      )
        .filter(
          ([group]) => groupByPrefix.length === 0 || group !== defaultGroup
        )
        .map(([group, items], groupIndex, groups) => (
          <div key={`group-${groupIndex}`}>
            {groups.length > 1 && (
              <div
                key={`group-title-${groupIndex}`}
                className='fdk-items-title'
              >
                {localization.facet.formatType[group]}
              </div>
            )}
            <div key={`group-items-${groupIndex}`}>
              {options(items.slice(0, 5), groupIndex)}
              {items.length > 5 && (
                <div>
                  <Collapse isOpen={open}>
                    <div>{options(items.slice(5), groupIndex)}</div>
                  </Collapse>
                  <button
                    type='button'
                    className='fdk-toggleList'
                    onClick={this.toggleList}
                  >
                    <img
                      src={open ? CollapseTextIcon : ExpandTextIcon}
                      alt=''
                      className='mr-2'
                    />
                    {open
                      ? localization.facet.showfewer
                      : localization.facet.showmore}
                  </button>
                </div>
              )}
            </div>
          </div>
        ));
    }
    return null;
  }

  render() {
    const { openFilter, filterSearch } = this.state;
    const {
      title,
      filter,
      searchable,
      onClick,
      activeFilter,
      filters,
      groupByPrefix = [],
      capitalizeOption = true
    } = this.props;

    if (_.get(filter, 'buckets', []).length > 0) {
      return (
        <div className='fdk-panel--filter'>
          <div className='fdk-panel__header'>
            <button
              type='button'
              className='fdk-toggleFilter p-0 d-flex justify-content-between align-items-center w-100'
              onClick={this.toggleFilter}
            >
              <span>{title}</span>
            </button>
          </div>
          <Collapse isOpen={openFilter}>
            <div className='fdk-panel__content'>
              {searchable && (
                <div className='fdk-filter-search'>
                  <FilterSearchField
                    value={filterSearch}
                    onClick={this.search}
                    placeholder={`${
                      localization.facet.searchFor
                    } ${title?.toLowerCase()}`}
                  />
                </div>
              )}
              <div className='fdk-items-list'>
                {this._renderOptions(
                  filter,
                  onClick,
                  activeFilter,
                  filters,
                  filterSearch,
                  groupByPrefix,
                  capitalizeOption
                )}
              </div>
            </div>
          </Collapse>
        </div>
      );
    }
    return null;
  }
}
