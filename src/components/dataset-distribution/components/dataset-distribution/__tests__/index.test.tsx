/**
 * @jest-environment jsdom
 */
import React from 'react';

import { themeFDK as theme } from '../../../../../app/theme';

import { Expectation, renderWithTheme } from '../../../../../../test/utils';

import DatasetDistribution from '..';

import testIds from '../test-ids';

import { MediaTypeOrExtent } from '../../../../../types';

describe('DatasetDistribution component', () => {
  xit(Expectation.STRUCTURE, () => {
    const title = {
      nb: 'title-nb',
      nn: 'title-nn',
      en: 'title-en'
    };
    const description = {
      nb: 'description-nb',
      nn: 'description-nn',
      en: 'description-en'
    };
    const fdkFormat: MediaTypeOrExtent[] = [
      {
        uri: 'https://www.iana.org/assignments/media-types/application/json',
        name: 'json',
        code: 'application/json',
        type: 'MEDIA_TYPE'
      },
      {
        uri: 'https://www.iana.org/assignments/media-types/text/xml',
        name: 'xml',
        code: 'text/xml',
        type: 'MEDIA_TYPE'
      },
      {
        uri: 'https://www.iana.org/assignments/media-types/text/csv',
        name: 'csv',
        code: 'text/csv',
        type: 'MEDIA_TYPE'
      }
    ];
    const licenseWithLabel = {
      uri: 'licence-uri',
      prefLabel: {
        nb: 'license-label-nb',
        nn: 'license-label-nn',
        en: 'license-label-en'
      }
    };
    const licenseWithoutLabel = {
      uri: 'licence-uri'
    };
    const downloadURL = ['download-url'];
    const accessURL = ['access-url'];
    const conformsToWithLabel = [
      {
        uri: 'conforms-to-uri',
        prefLabel: {
          nb: 'conforms-to-label-nb',
          nn: 'conforms-to-label-nn',
          en: 'conforms-to-label-en'
        }
      }
    ];
    const conformsToWithoutLabel = [
      {
        uri: 'conforms-to-uri'
      }
    ];
    const page = [{ uri: 'page-uri' }];

    const {
      getByTestId,
      getAllByTestId,
      queryByTestId,
      queryAllByTestId,
      rerender
    } = renderWithTheme(
      <DatasetDistribution datasetTitle={{}} distribution={{}} />,
      { theme }
    );

    let datasetDistributionRootElement = getByTestId(testIds.root);
    let datasetDistributionSummaryElement = getByTestId(testIds.summary);
    let datasetDistributionDetailElements = queryAllByTestId(testIds.detail);
    let datasetDistributionMoreInfoElement = queryByTestId(testIds.moreInfo);

    expect(datasetDistributionRootElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toBeInTheDocument();
    expect(datasetDistributionDetailElements).toHaveLength(0);
    expect(datasetDistributionMoreInfoElement).not.toBeInTheDocument();

    datasetDistributionSummaryElement.click();

    datasetDistributionRootElement = getByTestId(testIds.root);
    datasetDistributionSummaryElement = getByTestId(testIds.summary);
    datasetDistributionDetailElements = getAllByTestId(testIds.detail);
    datasetDistributionMoreInfoElement = queryByTestId(testIds.moreInfo);

    expect(datasetDistributionRootElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toBeInTheDocument();
    expect(datasetDistributionDetailElements).toHaveLength(1);
    expect(datasetDistributionMoreInfoElement).not.toBeInTheDocument();

    rerender(
      <DatasetDistribution
        datasetTitle={title}
        distribution={{ description }}
      />
    );

    datasetDistributionRootElement = getByTestId(testIds.root);
    datasetDistributionSummaryElement = getByTestId(testIds.summary);
    datasetDistributionDetailElements = queryAllByTestId(testIds.detail);
    datasetDistributionMoreInfoElement = queryByTestId(testIds.moreInfo);

    expect(datasetDistributionRootElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toHaveTextContent(description.en);
    expect(datasetDistributionDetailElements).toHaveLength(1);
    expect(datasetDistributionDetailElements[0]).toHaveTextContent(
      description.en
    );
    expect(datasetDistributionMoreInfoElement).not.toBeInTheDocument();

    datasetDistributionSummaryElement.click();

    datasetDistributionRootElement = getByTestId(testIds.root);
    datasetDistributionSummaryElement = getByTestId(testIds.summary);
    datasetDistributionDetailElements = queryAllByTestId(testIds.detail);
    datasetDistributionMoreInfoElement = queryByTestId(testIds.moreInfo);

    expect(datasetDistributionRootElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toHaveTextContent(description.en);
    expect(datasetDistributionDetailElements).toHaveLength(0);
    expect(datasetDistributionMoreInfoElement).not.toBeInTheDocument();

    rerender(
      <DatasetDistribution
        datasetTitle={title}
        distribution={{ title, description }}
      />
    );

    datasetDistributionRootElement = getByTestId(testIds.root);
    datasetDistributionSummaryElement = getByTestId(testIds.summary);
    datasetDistributionDetailElements = queryAllByTestId(testIds.detail);
    datasetDistributionMoreInfoElement = queryByTestId(testIds.moreInfo);

    expect(datasetDistributionRootElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toHaveTextContent(title.en);
    expect(datasetDistributionDetailElements).toHaveLength(0);
    expect(datasetDistributionMoreInfoElement).not.toBeInTheDocument();

    datasetDistributionSummaryElement.click();

    datasetDistributionRootElement = getByTestId(testIds.root);
    datasetDistributionSummaryElement = getByTestId(testIds.summary);
    datasetDistributionDetailElements = getAllByTestId(testIds.detail);
    datasetDistributionMoreInfoElement = queryByTestId(testIds.moreInfo);

    expect(datasetDistributionRootElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toHaveTextContent(title.en);
    expect(datasetDistributionDetailElements).toHaveLength(1);
    expect(datasetDistributionDetailElements[0]).toHaveTextContent(
      description.en
    );
    expect(datasetDistributionMoreInfoElement).not.toBeInTheDocument();

    rerender(
      <DatasetDistribution
        datasetTitle={title}
        distribution={{ title, description, fdkFormat }}
      />
    );

    datasetDistributionRootElement = getByTestId(testIds.root);
    datasetDistributionSummaryElement = getByTestId(testIds.summary);
    datasetDistributionDetailElements = getAllByTestId(testIds.detail);
    datasetDistributionMoreInfoElement = queryByTestId(testIds.moreInfo);

    expect(datasetDistributionRootElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toHaveTextContent(title.en);
    expect(datasetDistributionDetailElements).toHaveLength(2);
    expect(datasetDistributionDetailElements[0]).toHaveTextContent(
      fdkFormat
        .map(format => format.name)
        .sort()
        .join(', ')
    );
    expect(datasetDistributionDetailElements[1]).toHaveTextContent(
      description.en
    );
    expect(datasetDistributionMoreInfoElement).not.toBeInTheDocument();

    datasetDistributionSummaryElement.click();

    datasetDistributionRootElement = getByTestId(testIds.root);
    datasetDistributionSummaryElement = getByTestId(testIds.summary);
    datasetDistributionDetailElements = queryAllByTestId(testIds.detail);
    datasetDistributionMoreInfoElement = queryByTestId(testIds.moreInfo);

    expect(datasetDistributionRootElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toHaveTextContent(title.en);
    expect(datasetDistributionDetailElements).toHaveLength(0);
    expect(datasetDistributionMoreInfoElement).not.toBeInTheDocument();

    rerender(
      <DatasetDistribution
        datasetTitle={title}
        distribution={{
          title,
          description,
          fdkFormat,
          license: [licenseWithLabel]
        }}
      />
    );

    datasetDistributionRootElement = getByTestId(testIds.root);
    datasetDistributionSummaryElement = getByTestId(testIds.summary);
    datasetDistributionDetailElements = queryAllByTestId(testIds.detail);
    datasetDistributionMoreInfoElement = queryByTestId(testIds.moreInfo);

    expect(datasetDistributionRootElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toHaveTextContent(title.en);
    expect(datasetDistributionDetailElements).toHaveLength(0);
    expect(datasetDistributionMoreInfoElement).not.toBeInTheDocument();

    datasetDistributionSummaryElement.click();

    datasetDistributionRootElement = getByTestId(testIds.root);
    datasetDistributionSummaryElement = getByTestId(testIds.summary);
    datasetDistributionDetailElements = getAllByTestId(testIds.detail);
    datasetDistributionMoreInfoElement = queryByTestId(testIds.moreInfo);

    expect(datasetDistributionRootElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toHaveTextContent(title.en);
    expect(datasetDistributionDetailElements).toHaveLength(3);
    expect(datasetDistributionDetailElements[0]).toHaveTextContent(
      fdkFormat
        .map(format => format.name)
        .sort()
        .join(', ')
    );
    expect(datasetDistributionDetailElements[1]).toHaveTextContent(
      licenseWithLabel.prefLabel.en
    );
    expect(
      datasetDistributionDetailElements[1].lastElementChild?.firstElementChild?.tagName.toLowerCase()
    ).toEqual('a');
    expect(
      datasetDistributionDetailElements[1].lastElementChild?.firstElementChild
    ).toHaveAttribute('href', licenseWithLabel.uri);
    expect(datasetDistributionMoreInfoElement).not.toBeInTheDocument();
    expect(datasetDistributionDetailElements[2]).toHaveTextContent(
      description.en
    );
    rerender(
      <DatasetDistribution
        datasetTitle={title}
        distribution={{
          title,
          description,
          fdkFormat,
          license: [licenseWithoutLabel]
        }}
      />
    );

    datasetDistributionRootElement = getByTestId(testIds.root);
    datasetDistributionSummaryElement = getByTestId(testIds.summary);
    datasetDistributionDetailElements = getAllByTestId(testIds.detail);
    datasetDistributionMoreInfoElement = queryByTestId(testIds.moreInfo);

    expect(datasetDistributionRootElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toHaveTextContent(title.en);
    expect(datasetDistributionDetailElements).toHaveLength(3);
    expect(datasetDistributionDetailElements[0]).toHaveTextContent(
      fdkFormat
        .map(format => format.name)
        .sort()
        .join(', ')
    );
    expect(datasetDistributionDetailElements[1]).toHaveTextContent(
      licenseWithoutLabel.uri
    );
    expect(
      datasetDistributionDetailElements[1].lastElementChild?.firstElementChild?.tagName.toLowerCase()
    ).toEqual('a');
    expect(
      datasetDistributionDetailElements[1].lastElementChild?.firstElementChild
    ).toHaveAttribute('href', licenseWithoutLabel.uri);
    expect(datasetDistributionMoreInfoElement).not.toBeInTheDocument();
    expect(datasetDistributionDetailElements[2]).toHaveTextContent(
      description.en
    );
    datasetDistributionSummaryElement.click();

    datasetDistributionRootElement = getByTestId(testIds.root);
    datasetDistributionSummaryElement = getByTestId(testIds.summary);
    datasetDistributionDetailElements = queryAllByTestId(testIds.detail);
    datasetDistributionMoreInfoElement = queryByTestId(testIds.moreInfo);

    expect(datasetDistributionRootElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toHaveTextContent(title.en);
    expect(datasetDistributionDetailElements).toHaveLength(0);
    expect(datasetDistributionMoreInfoElement).not.toBeInTheDocument();

    rerender(
      <DatasetDistribution
        datasetTitle={title}
        distribution={{
          title,
          description,
          fdkFormat,
          license: [licenseWithLabel],
          downloadURL
        }}
      />
    );

    datasetDistributionRootElement = getByTestId(testIds.root);
    datasetDistributionSummaryElement = getByTestId(testIds.summary);
    datasetDistributionDetailElements = queryAllByTestId(testIds.detail);
    datasetDistributionMoreInfoElement = queryByTestId(testIds.moreInfo);

    expect(datasetDistributionRootElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toHaveTextContent(title.en);
    expect(datasetDistributionDetailElements).toHaveLength(0);
    expect(datasetDistributionMoreInfoElement).not.toBeInTheDocument();

    datasetDistributionSummaryElement.click();

    datasetDistributionRootElement = getByTestId(testIds.root);
    datasetDistributionSummaryElement = getByTestId(testIds.summary);
    datasetDistributionDetailElements = getAllByTestId(testIds.detail);
    datasetDistributionMoreInfoElement = queryByTestId(testIds.moreInfo);

    expect(datasetDistributionRootElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toHaveTextContent(title.en);
    expect(datasetDistributionDetailElements).toHaveLength(3);
    expect(datasetDistributionDetailElements[0]).toHaveTextContent(
      fdkFormat
        .map(format => format.name)
        .sort()
        .join(', ')
    );
    expect(datasetDistributionDetailElements[1]).toHaveTextContent(
      licenseWithLabel.prefLabel.en
    );
    expect(
      datasetDistributionDetailElements[1].lastElementChild?.firstElementChild?.tagName.toLowerCase()
    ).toEqual('a');
    expect(
      datasetDistributionDetailElements[1].lastElementChild?.firstElementChild
    ).toHaveAttribute('href', licenseWithLabel.uri);
    expect(datasetDistributionMoreInfoElement).not.toBeInTheDocument();
    expect(datasetDistributionDetailElements[2]).toHaveTextContent(
      description.en
    );
    rerender(
      <DatasetDistribution
        datasetTitle={title}
        distribution={{
          title,
          description,
          fdkFormat,
          license: [licenseWithLabel],
          downloadURL,
          accessURL
        }}
      />
    );

    datasetDistributionRootElement = getByTestId(testIds.root);
    datasetDistributionSummaryElement = getByTestId(testIds.summary);
    datasetDistributionDetailElements = getAllByTestId(testIds.detail);
    datasetDistributionMoreInfoElement = queryByTestId(testIds.moreInfo);

    expect(datasetDistributionRootElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toHaveTextContent(title.en);
    expect(datasetDistributionDetailElements).toHaveLength(4);
    expect(datasetDistributionDetailElements[0]).toHaveTextContent(
      fdkFormat
        .map(format => format.name)
        .sort()
        .join(', ')
    );
    expect(datasetDistributionDetailElements[1]).toHaveTextContent(
      accessURL[0]
    );
    expect(
      datasetDistributionDetailElements[1].lastElementChild?.firstElementChild?.tagName.toLowerCase()
    ).toEqual('a');
    expect(
      datasetDistributionDetailElements[1].lastElementChild?.firstElementChild
    ).toHaveAttribute('href', accessURL[0]);
    expect(datasetDistributionDetailElements[2]).toHaveTextContent(
      licenseWithLabel.prefLabel.en
    );
    expect(
      datasetDistributionDetailElements[2].lastElementChild?.firstElementChild?.tagName.toLowerCase()
    ).toEqual('a');
    expect(
      datasetDistributionDetailElements[2].lastElementChild?.firstElementChild
    ).toHaveAttribute('href', licenseWithLabel.uri);
    expect(datasetDistributionMoreInfoElement).not.toBeInTheDocument();
    expect(datasetDistributionDetailElements[3]).toHaveTextContent(
      description.en
    );
    datasetDistributionSummaryElement.click();

    datasetDistributionRootElement = getByTestId(testIds.root);
    datasetDistributionSummaryElement = getByTestId(testIds.summary);
    datasetDistributionDetailElements = queryAllByTestId(testIds.detail);
    datasetDistributionMoreInfoElement = queryByTestId(testIds.moreInfo);

    expect(datasetDistributionRootElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toHaveTextContent(title.en);
    expect(datasetDistributionDetailElements).toHaveLength(0);
    expect(datasetDistributionMoreInfoElement).not.toBeInTheDocument();

    rerender(
      <DatasetDistribution
        datasetTitle={title}
        distribution={{
          title,
          description,
          fdkFormat,
          license: [licenseWithLabel],
          downloadURL,
          accessURL,
          conformsTo: conformsToWithLabel
        }}
      />
    );

    datasetDistributionRootElement = getByTestId(testIds.root);
    datasetDistributionSummaryElement = getByTestId(testIds.summary);
    datasetDistributionDetailElements = queryAllByTestId(testIds.detail);
    datasetDistributionMoreInfoElement = queryByTestId(testIds.moreInfo);

    expect(datasetDistributionRootElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toHaveTextContent(title.en);
    expect(datasetDistributionDetailElements).toHaveLength(0);
    expect(datasetDistributionMoreInfoElement).not.toBeInTheDocument();

    datasetDistributionSummaryElement.click();

    datasetDistributionRootElement = getByTestId(testIds.root);
    datasetDistributionSummaryElement = getByTestId(testIds.summary);
    datasetDistributionDetailElements = getAllByTestId(testIds.detail);
    datasetDistributionMoreInfoElement = queryByTestId(testIds.moreInfo);

    expect(datasetDistributionRootElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toHaveTextContent(title.en);
    expect(datasetDistributionDetailElements).toHaveLength(5);
    expect(datasetDistributionDetailElements[0]).toHaveTextContent(
      fdkFormat
        .map(format => format.name)
        .sort()
        .join(', ')
    );
    expect(datasetDistributionDetailElements[1]).toHaveTextContent(
      accessURL[0]
    );
    expect(
      datasetDistributionDetailElements[1].lastElementChild?.firstElementChild?.tagName.toLowerCase()
    ).toEqual('a');
    expect(
      datasetDistributionDetailElements[1].lastElementChild?.firstElementChild
    ).toHaveAttribute('href', accessURL[0]);
    expect(datasetDistributionDetailElements[2]).toHaveTextContent(
      licenseWithLabel.prefLabel.en
    );
    expect(
      datasetDistributionDetailElements[2].lastElementChild?.firstElementChild?.tagName.toLowerCase()
    ).toEqual('a');
    expect(
      datasetDistributionDetailElements[2].lastElementChild?.firstElementChild
    ).toHaveAttribute('href', licenseWithLabel.uri);
    expect(datasetDistributionDetailElements[3]).toHaveTextContent(
      description.en
    );
    expect(datasetDistributionDetailElements[4]).toHaveTextContent(
      conformsToWithLabel[0].prefLabel.en
    );
    expect(
      datasetDistributionDetailElements[4].lastElementChild?.firstElementChild?.tagName.toLowerCase()
    ).toEqual('a');
    expect(
      datasetDistributionDetailElements[4].lastElementChild?.firstElementChild
    ).toHaveAttribute('href', conformsToWithLabel[0].uri);
    expect(datasetDistributionMoreInfoElement).not.toBeInTheDocument();

    rerender(
      <DatasetDistribution
        datasetTitle={title}
        distribution={{
          title,
          description,
          fdkFormat,
          license: [licenseWithLabel],
          downloadURL,
          accessURL,
          conformsTo: conformsToWithoutLabel
        }}
      />
    );

    datasetDistributionRootElement = getByTestId(testIds.root);
    datasetDistributionSummaryElement = getByTestId(testIds.summary);
    datasetDistributionDetailElements = getAllByTestId(testIds.detail);
    datasetDistributionMoreInfoElement = queryByTestId(testIds.moreInfo);

    expect(datasetDistributionRootElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toHaveTextContent(title.en);
    expect(datasetDistributionDetailElements).toHaveLength(5);
    expect(datasetDistributionDetailElements[0]).toHaveTextContent(
      fdkFormat
        .map(format => format.name)
        .sort()
        .join(', ')
    );
    expect(datasetDistributionDetailElements[1]).toHaveTextContent(
      accessURL[0]
    );
    expect(
      datasetDistributionDetailElements[1].lastElementChild?.firstElementChild?.tagName.toLowerCase()
    ).toEqual('a');
    expect(
      datasetDistributionDetailElements[1].lastElementChild?.firstElementChild
    ).toHaveAttribute('href', accessURL[0]);
    expect(datasetDistributionDetailElements[2]).toHaveTextContent(
      licenseWithLabel.prefLabel.en
    );
    expect(
      datasetDistributionDetailElements[2].lastElementChild?.firstElementChild?.tagName.toLowerCase()
    ).toEqual('a');
    expect(
      datasetDistributionDetailElements[2].lastElementChild?.firstElementChild
    ).toHaveAttribute('href', licenseWithLabel.uri);
    expect(datasetDistributionDetailElements[3]).toHaveTextContent(
      description.en
    );
    expect(datasetDistributionDetailElements[4]).toHaveTextContent(
      conformsToWithoutLabel[0].uri
    );
    expect(
      datasetDistributionDetailElements[4].lastElementChild?.firstElementChild?.tagName.toLowerCase()
    ).toEqual('a');
    expect(
      datasetDistributionDetailElements[4].lastElementChild?.firstElementChild
    ).toHaveAttribute('href', conformsToWithoutLabel[0].uri);
    expect(datasetDistributionMoreInfoElement).not.toBeInTheDocument();

    datasetDistributionSummaryElement.click();

    datasetDistributionRootElement = getByTestId(testIds.root);
    datasetDistributionSummaryElement = getByTestId(testIds.summary);
    datasetDistributionDetailElements = queryAllByTestId(testIds.detail);
    datasetDistributionMoreInfoElement = queryByTestId(testIds.moreInfo);

    expect(datasetDistributionRootElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toHaveTextContent(title.en);
    expect(datasetDistributionDetailElements).toHaveLength(0);
    expect(datasetDistributionMoreInfoElement).not.toBeInTheDocument();

    rerender(
      <DatasetDistribution
        datasetTitle={title}
        distribution={{
          title,
          description,
          fdkFormat,
          license: [licenseWithLabel],
          downloadURL,
          accessURL,
          conformsTo: conformsToWithLabel,
          page
        }}
      />
    );

    datasetDistributionRootElement = getByTestId(testIds.root);
    datasetDistributionSummaryElement = getByTestId(testIds.summary);
    datasetDistributionDetailElements = queryAllByTestId(testIds.detail);
    datasetDistributionMoreInfoElement = queryByTestId(testIds.moreInfo);

    expect(datasetDistributionRootElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toHaveTextContent(title.en);
    expect(datasetDistributionDetailElements).toHaveLength(0);
    expect(datasetDistributionMoreInfoElement).not.toBeInTheDocument();

    datasetDistributionSummaryElement.click();

    datasetDistributionRootElement = getByTestId(testIds.root);
    datasetDistributionSummaryElement = getByTestId(testIds.summary);
    datasetDistributionDetailElements = getAllByTestId(testIds.detail);
    datasetDistributionMoreInfoElement = getByTestId(testIds.moreInfo);

    expect(datasetDistributionRootElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toHaveTextContent(title.en);
    expect(datasetDistributionDetailElements).toHaveLength(5);
    expect(datasetDistributionDetailElements[0]).toHaveTextContent(
      fdkFormat
        .map(format => format.name)
        .sort()
        .join(', ')
    );
    expect(datasetDistributionDetailElements[1]).toHaveTextContent(
      accessURL[0]
    );
    expect(
      datasetDistributionDetailElements[1].lastElementChild?.firstElementChild?.tagName.toLowerCase()
    ).toEqual('a');
    expect(
      datasetDistributionDetailElements[1].lastElementChild?.firstElementChild
    ).toHaveAttribute('href', accessURL[0]);
    expect(datasetDistributionDetailElements[2]).toHaveTextContent(
      licenseWithLabel.prefLabel.en
    );
    expect(
      datasetDistributionDetailElements[2].lastElementChild?.firstElementChild?.tagName.toLowerCase()
    ).toEqual('a');
    expect(
      datasetDistributionDetailElements[2].lastElementChild?.firstElementChild
    ).toHaveAttribute('href', licenseWithLabel.uri);
    expect(datasetDistributionDetailElements[3]).toHaveTextContent(
      description.en
    );
    expect(datasetDistributionDetailElements[4]).toHaveTextContent(
      conformsToWithLabel[0].prefLabel.en
    );
    expect(
      datasetDistributionDetailElements[4].lastElementChild?.firstElementChild?.tagName.toLowerCase()
    ).toEqual('a');
    expect(
      datasetDistributionDetailElements[4].lastElementChild?.firstElementChild
    ).toHaveAttribute('href', conformsToWithLabel[0].uri);
    expect(datasetDistributionMoreInfoElement).toBeInTheDocument();
    expect(datasetDistributionMoreInfoElement.textContent).toEqual(
      expect.any(String)
    );
    expect(datasetDistributionMoreInfoElement.tagName.toLowerCase()).toEqual(
      'a'
    );
    expect(datasetDistributionMoreInfoElement).toHaveAttribute(
      'href',
      page[0].uri
    );
  });

  it('must not be expanded by default', () => {
    const { container, getByTestId, queryByTestId, queryAllByTestId } =
      renderWithTheme(
        <DatasetDistribution datasetTitle={{}} distribution={{}} />,
        { theme }
      );

    const datasetDistributionRootElement = getByTestId(testIds.root);
    const datasetDistributionSummaryElement = getByTestId(testIds.summary);
    const datasetDistributionDetailElements = queryAllByTestId(testIds.detail);
    const datasetDistributionMoreInfoElement = queryByTestId(testIds.moreInfo);

    expect(container).not.toBeEmptyDOMElement();
    expect(datasetDistributionRootElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toBeInTheDocument();
    expect(datasetDistributionDetailElements).toHaveLength(0);
    expect(datasetDistributionMoreInfoElement).not.toBeInTheDocument();
  });

  it('must be able to expand and collapse', () => {
    const {
      container,
      getByTestId,
      getAllByTestId,
      queryByTestId,
      queryAllByTestId
    } = renderWithTheme(
      <DatasetDistribution datasetTitle={{}} distribution={{}} />,
      { theme }
    );

    let datasetDistributionRootElement = getByTestId(testIds.root);
    let datasetDistributionSummaryElement = getByTestId(testIds.summary);
    let datasetDistributionDetailElements = queryAllByTestId(testIds.detail);
    let datasetDistributionMoreInfoElement = queryByTestId(testIds.moreInfo);

    expect(container).not.toBeEmptyDOMElement();
    expect(datasetDistributionRootElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toBeInTheDocument();
    expect(datasetDistributionDetailElements).toHaveLength(0);
    expect(datasetDistributionMoreInfoElement).not.toBeInTheDocument();

    datasetDistributionSummaryElement.click();

    datasetDistributionRootElement = getByTestId(testIds.root);
    datasetDistributionSummaryElement = getByTestId(testIds.summary);
    datasetDistributionDetailElements = getAllByTestId(testIds.detail);
    datasetDistributionMoreInfoElement = queryByTestId(testIds.moreInfo);

    expect(container).not.toBeEmptyDOMElement();
    expect(datasetDistributionRootElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toBeInTheDocument();
    expect(datasetDistributionDetailElements).toHaveLength(1);
    expect(datasetDistributionMoreInfoElement).not.toBeInTheDocument();

    datasetDistributionSummaryElement.click();

    datasetDistributionRootElement = getByTestId(testIds.root);
    datasetDistributionSummaryElement = getByTestId(testIds.summary);
    datasetDistributionDetailElements = queryAllByTestId(testIds.detail);
    datasetDistributionMoreInfoElement = queryByTestId(testIds.moreInfo);

    expect(container).not.toBeEmptyDOMElement();
    expect(datasetDistributionRootElement).toBeInTheDocument();
    expect(datasetDistributionSummaryElement).toBeInTheDocument();
    expect(datasetDistributionDetailElements).toHaveLength(0);
    expect(datasetDistributionMoreInfoElement).not.toBeInTheDocument();
  });
});
