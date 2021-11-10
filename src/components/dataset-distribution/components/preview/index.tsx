import React, { memo, FC, useEffect } from 'react';

import { compose } from 'redux';

import DataGrid from 'react-data-grid';

import SC from './styled';
import withDatasetPreview, {
  Props as DatasetPreviewProps
} from '../../../with-dataset-preview';

import translations from '../../../../lib/localization';

import Spinner from '../../../spinner';

interface ExternalProps {
  downloadURL: string;
  rowCount: number;
  isOpen: boolean;
  onClose: () => void;
}

interface Props extends ExternalProps, DatasetPreviewProps {}

const Preview: FC<Props> = ({
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
      table: { header }
    } = datasetPreview;

    return header?.columns.map((column: string, index) => ({
      key: `column-${index}`,
      name: column,
      resizable: true,
      sortable: true
    }));
  };

  const getRows = (): any => {
    const {
      table: { rows }
    } = datasetPreview;

    return rows?.map(row =>
      row.columns.reduce(
        (result, column, index) => ({
          ...result,
          [`column-${index}`]: column
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
  }, []);

  return (
    <SC.Modal show={isOpen}>
      <SC.Container>
        <SC.Header>
          <SC.CloseButton onClick={() => handleOnClose()}>
            <SC.ClearIcon /> Lukk
          </SC.CloseButton>
        </SC.Header>
        {isLoadingDatasetPreview && (
          <SC.Center>
            <Spinner />
          </SC.Center>
        )}
        {datasetPreview && !isLoadingDatasetPreview && (
          <DataGrid columns={getColumns()} rows={getRows()} />
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
