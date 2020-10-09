import React, { FC, memo, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { KeyWithCountObject } from '../../../../types';
import { Entity } from '../../../../types/enums';

interface Props {
  formats: any;
  theme: any;
  history: any;
  entityType?: Entity;
}

const FormatPie: FC<Props> = ({
  formats,
  theme,
  entityType = Entity.DATASET
}) => {
  const [hovered, setHovered] = useState<number | undefined>(undefined);

  const data = formats.map(
    ({ key, count }: KeyWithCountObject, index: number) => {
      const colorArray: { [key: string]: string } =
        theme.extendedColors[entityType].graph;
      return {
        value: Number(count) ?? 0,
        label: key,
        color:
          hovered === index
            ? theme.extendedColors.neutralDarkest
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
            ? theme.extendedColors.neutralDarkest
            : theme.extendedColors[entityType].dark,
        fontSize: '4px',
        fontWeight: hovered === index ? 'bold' : 'normal'
      })}
      lineWidth={lineWidth}
      segmentsStyle={{ transition: 'stroke .3s' }}
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
