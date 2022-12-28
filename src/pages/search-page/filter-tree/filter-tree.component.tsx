import React, { ChangeEvent, FC, useState } from 'react';
import TreeView from 'react-treeview';
import { Collapse } from 'reactstrap';
import _ from 'lodash';

import Select from 'react-select';
import Button, { Variant } from '@fellesdatakatalog/button';
import SvgIcon from '@fellesdatakatalog/icons';
import { FilterOption } from '../../../components/filter-option/filter-option.component';
import localization from '../../../lib/localization';
import { getTranslateText } from '../../../lib/translateText';
import './filter-tree.scss';

import { FilterSearchOption } from '../../../types';
import { FilterChange } from '../../../components/filter-box/filter-box.component';

interface Props {
  title?: string;
  aggregationsForest?: any[];
  handleFiltering?: (change: FilterChange) => void;
  activeFilter?: string;
  referenceDataItems?: Record<string, any>;
  collapseItems?: boolean;
  searchable?: boolean;
}

const getNameFromNode = (node: any, referenceDataItems: any) => {
  let name = node.key;
  if (referenceDataItems) {
    const { key } = node || {};
    // const currentPublisher = referenceDataItems[key];
    if (
      key &&
      (key === '/STAT' ||
        key === '/FYLKE' ||
        key === '/KOMMUNE' ||
        key === '/PRIVAT' ||
        key === '/ANNET')
    ) {
      name = _.capitalize(key.replace(/^\/|\/$/g, ''));
    } else if (referenceDataItems[key]) {
      name =
        getTranslateText(_.get(referenceDataItems, [node.key, 'prefLabel'])) ||
        _.capitalize(_.get(referenceDataItems, [node.key, 'name'], node.key));
    }
  }

  if (name?.toUpperCase() === 'UKJENT' || name?.toUpperCase() === 'MISSING') {
    name = localization.unknown;
  } else if (name?.toUpperCase()?.startsWith('/ANNET')) {
    name = _.capitalize(name.substr(name.lastIndexOf('/') + 1, name.length));
  } else {
    name = (name && localization[name]) || name;
  }
  if (name && name === name.toUpperCase()) {
    name = localization[name.toLowerCase()] || name;
  }

  return name;
};

const isItemCollapsed = (
  itemOrgPath: any,
  chosenOrgPath: any,
  openArrows: any
) => {
  if (chosenOrgPath) {
    const parentOrgPath = chosenOrgPath.substr(
      0,
      chosenOrgPath.lastIndexOf('/')
    );

    if (parentOrgPath?.includes(itemOrgPath)) {
      return false;
    }
  }

  return !_.includes(openArrows, itemOrgPath);
};

const hasSomeChildren = (node: any) =>
  node && Array.isArray(node.children) && node.children.length > 0;
const hasSomeSiblingChildren = (siblings: any[]) =>
  Array.isArray(siblings) && siblings.some(hasSomeChildren);

const isActiveFilter = (activeFilter: string | undefined, key: string) =>
  activeFilter?.split(',').includes(key);

const subTree = ({
  aggregations,
  activeFilter,
  referenceDataItems,
  onClickFilter,
  onClickArrow,
  openArrows
}: any) =>
  aggregations.map((node: any, i: number) => {
    const name =
      getTranslateText(_.get(referenceDataItems, [node.key, 'prefLabel'])) ||
      _.capitalize(_.get(referenceDataItems, [node.key, 'name'], node.key));

    const label = (
      <FilterOption
        key={`${node.key}|${i}`}
        itemKey={0.5}
        value={node.key}
        labelRaw={name}
        count={node.count}
        onClick={onClickFilter}
        active={isActiveFilter(activeFilter, node.key)}
        displayClass={hasSomeChildren(node) ? 'inline-block' : ''}
      />
    );
    const collapsed = isItemCollapsed(node.key, activeFilter, openArrows);
    if (hasSomeChildren(node)) {
      return (
        <TreeView
          key={`${node.key}|${i}`}
          nodeLabel={label}
          defaultCollapsed={collapsed}
          itemClassName='tree-view_main d-flex flex-row-reverse align-items-start'
          onClick={onClickArrow}
        >
          {subTree({
            aggregations: node.children,
            activeFilter,
            referenceDataItems,
            onClickFilter
          })}
        </TreeView>
      );
    }
    return (
      <FilterOption
        key={`${node.key}|${i}`}
        itemKey={0.5}
        value={node.key}
        labelRaw={name}
        count={node.count}
        onClick={onClickFilter}
        active={isActiveFilter(activeFilter, node.key)}
        displayClass={hasSomeSiblingChildren(aggregations) ? 'indent' : ''}
      />
    );
  });

const mainTree = ({
  aggregationsForest,
  activeFilter,
  referenceDataItems,
  onClickFilter,
  onClickArrow,
  openArrows
}: any) =>
  Array.isArray(aggregationsForest) &&
  aggregationsForest.map((node, i) => {
    const collapsed = isItemCollapsed(node.key, activeFilter, openArrows);
    let name = getNameFromNode(node, referenceDataItems);
    const label = (
      <FilterOption
        key={`${node.key}|${i}`}
        itemKey={0.5}
        value={node.key}
        label={name}
        count={node.count}
        onClick={onClickFilter}
        active={isActiveFilter(activeFilter, node.key)}
        displayClass={hasSomeChildren(node) ? 'inline-block' : ''}
      />
    );
    if (node.key !== 'ukjent' && node.key !== 'MISSING') {
      if (!hasSomeChildren(node)) {
        return label;
      }

      return (
        <div key={`panel${i}`} className='section'>
          <TreeView
            key={`${node.key}|${i}`}
            className={node.key}
            nodeLabel={label}
            defaultCollapsed={collapsed}
            itemClassName='tree-view_main d-flex flex-row-reverse align-items-start'
            onClick={onClickArrow}
          >
            {subTree({
              aggregations: node.children,
              activeFilter,
              referenceDataItems,
              onClickFilter
            })}
          </TreeView>
        </div>
      );
    }
    name = localization.unknown;
    return (
      <FilterOption
        key={`${node.key}|${i}`}
        itemKey={0.5}
        value={node.key}
        label={name}
        count={node.count}
        onClick={onClickFilter}
        active={isActiveFilter(activeFilter, node.key)}
      />
    );
  });

export const FilterTree: FC<Props> = ({
  title,
  aggregationsForest,
  handleFiltering,
  activeFilter,
  referenceDataItems,
  collapseItems,
  searchable
}) => {
  const [openFilter, setOpenFilter] = useState(true);
  const [openList, setOpenList] = useState(false);
  const [openArrows, setOpenArrows] = useState<any[]>([]);
  const [filterSearchValue, setfilterSearchValue] = useState<any>(null);

  const handleToggleOpenFilter = () => {
    setOpenFilter(!openFilter);
  };

  const handleToggleOpenList = () => {
    setOpenList(!openList);
  };

  const handleOnSelectSearch = ({ value }: any) => {
    if (handleFiltering) {
      handleFiltering({ value, checked: true });
      setfilterSearchValue(null);
    }
  };

  const onClickArrow = (e: any) => {
    const classNames = e.target.className.split(' ');
    if (_.includes(classNames, 'tree-view_arrow-collapsed')) {
      setOpenArrows([...openArrows, classNames[0]]);
    } else {
      // close arrow -> remove from state
      const updatedArray = openArrows.map(item => {
        if (item !== classNames[0]) {
          return item;
        }
        return undefined;
      });
      setOpenArrows(_.reject(updatedArray, _.isNil));
    }
  };

  const onClickFilter = ({
    target: { value, checked }
  }: ChangeEvent<HTMLInputElement>) => {
    if (handleFiltering) {
      handleFiltering({ value, checked });
      setfilterSearchValue(null);
    }
  };

  const getFilterSearchOption = (node: any) => ({
    value: `${node.key}`,
    label: `${getNameFromNode(node, referenceDataItems)}`
  });

  const mapNodeToFilterSearchOptions = (node: any): FilterSearchOption[] =>
    node.children
      ? [
          getFilterSearchOption(node),
          ...(node.children.flatMap(
            mapNodeToFilterSearchOptions
          ) as FilterSearchOption[])
        ]
      : [getFilterSearchOption(node)];

  return Array.isArray(aggregationsForest) && aggregationsForest.length > 0 ? (
    <div className='fdk-filter-tree'>
      <div className='fdk-panel__header'>
        <button
          type='button'
          className='fdk-publisher-toggle p-0 d-flex justify-content-between align-items-center w-100'
          onClick={handleToggleOpenFilter}
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
                options={aggregationsForest
                  .flatMap(node => mapNodeToFilterSearchOptions(node))
                  .sort((a, b) => a.label.localeCompare(b.label))}
                value={filterSearchValue}
                onChange={handleOnSelectSearch}
                placeholder={`${
                  localization.facet.searchFor
                } ${title?.toLowerCase()}`}
                classNames={{
                  control: (state: { isFocused: boolean }) =>
                    state.isFocused
                      ? 'fdk-filter-search-select-focused'
                      : 'fdk-filter-search-select'
                }}
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
            {mainTree({
              aggregationsForest: collapseItems
                ? aggregationsForest.slice(0, 5)
                : aggregationsForest,
              activeFilter,
              referenceDataItems,
              onClickFilter,
              onClickArrow,
              openArrows
            })}
            {collapseItems && aggregationsForest.length > 5 && (
              <div>
                <Collapse isOpen={openList}>
                  <div>
                    {mainTree({
                      aggregationsForest: aggregationsForest.slice(5),
                      activeFilter,
                      referenceDataItems,
                      onClickFilter,
                      onClickArrow,
                      openArrows
                    })}
                  </div>
                </Collapse>
                <Button
                  variant={Variant.TERTIARY}
                  className='fdk-toggleList'
                  onClick={handleToggleOpenList}
                >
                  {openList ? (
                    <SvgIcon name='chevronDoubleUpStroke' />
                  ) : (
                    <SvgIcon name='chevronDoubleDownStroke' />
                  )}
                  {openList
                    ? localization.facet.showfewer
                    : localization.facet.showmore}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Collapse>
    </div>
  ) : null;
};
