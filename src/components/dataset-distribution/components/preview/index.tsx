import React, { memo, FC, useEffect } from 'react';

import { compose } from 'redux';

import DataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';

import xmlFormat from 'xml-formatter';

import SC from './styled';
import withDatasetPreview, {
  Props as DatasetPreviewProps
} from '../../../with-dataset-preview';

import translations from '../../../../lib/localization';

import Spinner from '../../../spinner';
import { PreviewPlain } from '../../../../types';

interface ExternalProps {
  title: string;
  subtitle: string;
  downloadURL: string;
  rowCount: number;
  isOpen: boolean;
  onClose: () => void;
}

interface Props extends ExternalProps, DatasetPreviewProps {}

const isXML = ({ contentType, value }: PreviewPlain) =>
  contentType.includes('xml') || value.startsWith('<');
const isJSON = ({ contentType, value }: PreviewPlain) =>
  contentType.includes('json') ||
  value.startsWith('{') ||
  value.startsWith('[');

const beautifyJSON = (jsonString: string) => {
  const jsonObject = JSON.parse(jsonString);
  return JSON.stringify(jsonObject, null, 2);
};

const Preview: FC<Props> = ({
  title,
  subtitle,
  downloadURL,
  rowCount,
  isOpen,
  onClose,
  datasetPreview,
  isLoadingDatasetPreview,
  datasetPreviewActions: { getDatasetPreviewRequested: getDatasetPreview }
}) => {
  const getColumns = (): any => {
    const {
      table: { header, rows }
    } = datasetPreview;

    return header?.columns.map((column: string, index) => ({
      name: column,
      header: column,
      minWidth:
        rows.reduce(
          (length, row) =>
            row.columns[index]?.length > length
              ? row.columns[index].length
              : length,
          column.length
        ) * 10
    }));
  };

  const getRows = (): any => {
    const {
      table: { header, rows }
    } = datasetPreview;

    return rows?.map(row =>
      row.columns.reduce(
        (result, column, index) => ({
          ...result,
          [header?.columns[index]]: column
        }),
        {}
      )
    );
  };

  const updateScrolling = () => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  };

  const handleOnClose = () => {
    isOpen = false;
    updateScrolling();
    onClose();
  };

  useEffect(() => {
    updateScrolling();
  }, [isOpen]);

  useEffect(() => {
    getDatasetPreview(downloadURL, rowCount);
    return () => {
      // Handle on close on unmount
      handleOnClose();
    };
  }, []);

  return (
    <SC.Modal show={isOpen}>
      <SC.Container>
        <SC.Header>
          <SC.TitleHeader>
            <SC.Title>{title}</SC.Title>
            <SC.Subtitle>{subtitle}</SC.Subtitle>
          </SC.TitleHeader>
          <SC.ButtonContainer>
            <SC.CloseButton onClick={() => handleOnClose()}>
              <SC.ClearIcon /> Lukk
            </SC.CloseButton>
          </SC.ButtonContainer>
        </SC.Header>

        {isLoadingDatasetPreview && (
          <SC.Center>
            <Spinner />
          </SC.Center>
        )}
        {datasetPreview?.table && !isLoadingDatasetPreview && (
          <DataGrid columns={getColumns()} dataSource={getRows()} />
        )}
        {datasetPreview?.plain &&
          !datasetPreview?.table &&
          !isLoadingDatasetPreview &&
          isXML(datasetPreview.plain) && (
            <SC.Plain> {xmlFormat(datasetPreview.plain.value)}</SC.Plain>
          )}
        {datasetPreview?.plain &&
          !datasetPreview?.table &&
          !isLoadingDatasetPreview &&
          isJSON(datasetPreview.plain) && (
            <SC.Plain>{beautifyJSON(datasetPreview.plain.value)} </SC.Plain>
          )}
        {datasetPreview?.plain &&
          !datasetPreview?.table &&
          !isLoadingDatasetPreview &&
          !isXML(datasetPreview.plain) &&
          !isJSON(datasetPreview.plain) && (
            <SC.Center>
              <span>{translations.dataset.distribution.previewFailure}</span>
            </SC.Center>
          )}
        {!(datasetPreview || isLoadingDatasetPreview) && (
          <SC.Center>
            <span>{translations.dataset.distribution.previewFailure}</span>
          </SC.Center>
        )}
      </SC.Container>
    </SC.Modal>
  );
};

export default compose<FC<ExternalProps>>(memo, withDatasetPreview)(Preview);
