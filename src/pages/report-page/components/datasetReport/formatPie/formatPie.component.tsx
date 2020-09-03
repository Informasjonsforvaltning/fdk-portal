import React, { FC, memo, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { KeyWithCountObject } from '../../../../../types';
import { Entity, Filter } from '../../../../../types/enums';

import { PATHNAME_DATASETS } from '../../../../../constants/constants';
import { patchSearchQuery } from '../../../../../lib/addOrReplaceUrlParam';

interface Props {
  formats: any;
  theme: any;
  history: any;
}

const FormatPie: FC<Props> = ({ formats, theme, history }) => {
  const [hovered, setHovered] = useState<number | undefined>(undefined);

  const data = formats.map(
    ({ key, count }: KeyWithCountObject, index: number) => {
      const colorArray: { [key: string]: string } =
        theme.extendedColors[Entity.DATASET].graph;
      return {
        value: Number(count) ?? 0,
        label: key,
        color:
          hovered === index
            ? theme.extendedColors.neutralDarker
            : colorArray[Object.keys(colorArray)[index % 5]]
      };
    }
  );

  const lineWidth = 40;

  return (
    <PieChart
      style={{
        fontFamily:
          '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
        fontSize: '8px'
      }}
      data={data}
      startAngle={0}
      animate
      label={({ dataEntry }) => `${dataEntry.value} ${dataEntry.label}`}
      labelStyle={(index: any) => ({
        fill:
          hovered === index
            ? theme.extendedColors.neutralDarker
            : theme.extendedColors[Entity.DATASET].dark,
        fontSize: '4px',
        fontWeight: hovered === index ? 'bold' : 'normal'
      })}
      onClick={(e, segmentIndex) => {
        e.preventDefault();
        history.push(
          `${PATHNAME_DATASETS}${patchSearchQuery(
            Filter.FORMAT,
            formats[segmentIndex].key
          )}`
        );
      }}
      lineWidth={lineWidth}
      segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
      onMouseOver={(_, index) => {
        setHovered(index);
      }}
      onMouseOut={() => {
        setHovered(undefined);
      }}
    />
  );
};

export default memo(FormatPie);
