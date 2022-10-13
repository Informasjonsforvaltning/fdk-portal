import React, { ChangeEvent } from 'react';
import { Collapse } from 'reactstrap';
import _ from 'lodash';
import Select from 'react-select';

import localization from '../../lib/localization';
import { FilterOption } from '../filter-option/filter-option.component';
import './filter-box.scss';

import CollapseTextIcon from '../../img/icon-collapse-text-sm.svg';
import ExpandTextIcon from '../../img/icon-expand-text-sm.svg';
import { FilterSearchOption } from '../../types';

interface Props {
  htmlKey?: number;
  title?: string;
  filter: Record<string, any>;
  groupByPrefix?: string[];
  searchable?: boolean;
  onClick: (change: FilterChange) => void;
  activeFilter?: any;
  referenceDataItems?: Record<string, any>;
  filters?: Record<string, any>;
  capitalizeOption?: boolean;
}

export interface FilterChange {
  value: string;
  checked: boolean;
}

interface State {
  openFilter: boolean;
  open: boolean;
  filterSearchValue: any;
}

type BucketItem = {
  label?: string;
  key: string;
  count: number;
};

const DEFAULT_GROUP = 'default';

export class FilterBox extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      openFilter: true,
      open: false,
      filterSearchValue: null
    };
    this.toggleFilter = this.toggleFilter.bind(this);
    this.toggleList = this.toggleList.bind(this);
  }

  toggleFilter() {
    const { openFilter } = this.state;
    this.setState({ openFilter: !openFilter });
  }

  toggleList() {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  _getGroup(item: BucketItem, prefixes: string[]): string {
    if (prefixes.length > 0) {
      return item.key.startsWith(prefixes[0])
        ? prefixes[0]
        : this._getGroup(item, prefixes.slice(1));
    }
    return DEFAULT_GROUP;
  }

  _renderOptions(
    filter: any,
    onClick: any,
    activeFilter: any,
    allFilters: any,
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

    const groupByPrefixes = (data: BucketItem[]) =>
      data.reduce((results: Record<string, BucketItem[]>, item) => {
        const group = this._getGroup(item, groupByPrefix);
        const label = item.key.replace(new RegExp(`${group}\\s?`), '');
        item.label = label || localization.facet.formatType.UNKNOWN;
        results[group] = results[group] || [];
        results[group].push(item);
        return results;
      }, {});

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

    if (filter?.buckets) {
      return Object.entries(groupByPrefixes(filter.buckets))
        .filter(
          ([group]) => groupByPrefix.length === 0 || group !== DEFAULT_GROUP
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
    const { openFilter, filterSearchValue } = this.state;
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

    const filterSearchOptions = filter?.buckets
      ?.map((item: BucketItem) => {
        const group = this._getGroup(item, groupByPrefix);
        const label = item.key.replace(new RegExp(`${group}\\s?`), '');
        return {
          value: item.key,
          label: label || localization.facet.formatType.UNKNOWN
        };
      })
      .sort((a: FilterSearchOption, b: FilterSearchOption) =>
        a.label.localeCompare(b.label)
      );

    const handleOnClick = ({
      target: { value, checked }
    }: ChangeEvent<HTMLInputElement>) => {
      if (onClick) {
        onClick({ value, checked });
        this.setState({ filterSearchValue: null });
      }
    };

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
                  <Select
                    aria-label={`${
                      localization.facet.searchFor
                    } ${title?.toLowerCase()}`}
                    options={filterSearchOptions}
                    value={filterSearchValue}
                    onChange={({ value }: any) => {
                      onClick({ value, checked: true });
                      this.setState({ filterSearchValue: null });
                    }}
                    placeholder={`${
                      localization.facet.searchFor
                    } ${title?.toLowerCase()}`}
                    searchPromptText={localization.report.typeToSearch}
                    backspaceRemoves
                    theme={theme => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        neutral50: '#666'
                      }
                    })}
                  />
                </div>
              )}
              <div className='fdk-items-list'>
                {this._renderOptions(
                  filter,
                  handleOnClick,
                  activeFilter,
                  filters,
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
