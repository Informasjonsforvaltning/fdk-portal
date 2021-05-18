import React, { FC, useState } from 'react';
import TreeView from 'react-treeview';
import { Collapse } from 'reactstrap';
import _ from 'lodash';

import { FilterOption } from '../../../components/filter-option/filter-option.component';
import localization from '../../../lib/localization';
import { getTranslateText } from '../../../lib/translateText';
import './filter-tree.scss';

import CollapseTextIcon from '../../../img/icon-collapse-text-sm.svg';
import ExpandTextIcon from '../../../img/icon-expand-text-sm.svg';

interface Props {
  title?: string;
  aggregationsForest?: any[];
  handleFiltering?: (...args: any[]) => void;
  activeFilter?: string;
  referenceDataItems?: Record<string, any>;
  collapseItems?: boolean;
}

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
  handleFiltering,
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
        onClick={handleFiltering}
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
            handleFiltering
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
        onClick={handleFiltering}
        active={isActiveFilter(activeFilter, node.key)}
        displayClass={hasSomeSiblingChildren(aggregations) ? 'indent' : ''}
      />
    );
  });

const mainTree = ({
  aggregationsForest,
  activeFilter,
  referenceDataItems,
  handleFiltering,
  onClickArrow,
  openArrows
}: any) =>
  Array.isArray(aggregationsForest) &&
  aggregationsForest.map((node, i) => {
    const collapsed = isItemCollapsed(node.key, activeFilter, openArrows);

    let name = node.key;
    if (referenceDataItems) {
      const { key } = node || {};
      const currentPublisher = referenceDataItems[key];
      if (
        key &&
        (key === '/STAT' ||
          key === '/FYLKE' ||
          key === '/KOMMUNE' ||
          key === '/PRIVAT' ||
          key === '/ANNET')
      ) {
        name = _.capitalize(key.replace(/^\/|\/$/g, ''));
      } else if (currentPublisher) {
        name = getTranslateText(_.get(currentPublisher, 'prefLabel', node.key));
      }
    }

    const label = (
      <FilterOption
        key={`${node.key}|${i}`}
        itemKey={0.5}
        value={node.key}
        label={name}
        count={node.count}
        onClick={handleFiltering}
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
              handleFiltering
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
        onClick={handleFiltering}
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
  collapseItems
}) => {
  const [openFilter, setOpenFilter] = useState(true);
  const [openList, setOpenList] = useState(false);
  const [openArrows, setOpenArrows] = useState<any[]>([]);

  const handleToggleOpenFilter = () => {
    setOpenFilter(!openFilter);
  };

  const handleToggleOpenList = () => {
    setOpenList(!openList);
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
          <div className='fdk-items-list'>
            {mainTree({
              aggregationsForest: collapseItems
                ? aggregationsForest.slice(0, 5)
                : aggregationsForest,
              activeFilter,
              referenceDataItems,
              handleFiltering,
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
                      handleFiltering,
                      onClickArrow,
                      openArrows
                    })}
                  </div>
                </Collapse>
                <button
                  type='button'
                  className='fdk-toggleList'
                  onClick={handleToggleOpenList}
                >
                  <img
                    src={openList ? CollapseTextIcon : ExpandTextIcon}
                    alt=''
                    className='mr-2'
                  />
                  {openList
                    ? localization.facet.showfewer
                    : localization.facet.showmore}
                </button>
              </div>
            )}
          </div>
        </div>
      </Collapse>
    </div>
  ) : null;
};
