import React from 'react';
import { Collapse } from 'reactstrap';
import _ from 'lodash';

import localization from '../../lib/localization';
import { FilterOption } from '../filter-option/filter-option.component';
import './filter-box.scss';

import CollapseTextIcon from '../../img/icon-collapse-text-sm.svg';
import ExpandTextIcon from '../../img/icon-expand-text-sm.svg';

interface Props {
  htmlKey?: number;
  title?: string;
  filter: Record<string, any>;
  onClick: (...args: any[]) => void;
  activeFilter?: any;
  referenceDataItems?: Record<string, any>;
  filters?: Record<string, any>;
  capitalizeOption?: boolean;
}

interface State {
  openFilter: boolean;
  open: boolean;
}

export class FilterBox extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      openFilter: true,
      open: false
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

  _renderOptions(
    { buckets }: any,
    onClick: any,
    activeFilter: any,
    allFilters: any,
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
    const options = (items: any[]) =>
      items.map((item, index) => {
        // generate unique key, this is used by FilterOption on label htmlFor
        let itemKey = 0;
        if (htmlKey) {
          itemKey = Number.parseInt(`${htmlKey}${index}`, 10);
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
            label={item.key}
            count={item.count}
            onClick={onClick}
            active={active}
            capitalize={capitalizeOption}
            referenceDataItems={referenceDataItems}
          />
        );
      });

    if (buckets) {
      const bucketsLength = buckets.length;

      return (
        <div>
          {options(buckets.slice(0, 5))}
          {bucketsLength > 5 && (
            <div>
              <Collapse isOpen={open}>
                <div>{options(buckets.slice(5))}</div>
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
      );
    }
    return null;
  }

  render() {
    const { openFilter } = this.state;
    const {
      title,
      filter,
      onClick,
      activeFilter,
      filters,
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
              <div className='fdk-items-list'>
                {this._renderOptions(
                  filter,
                  onClick,
                  activeFilter,
                  filters,
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
