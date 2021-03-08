import React, { FC } from 'react';
import localization from '../../../lib/localization';

interface Props {
  pathName?: string;
}

const PathNameBreadcrumb: FC<Props> = ({ pathName }) =>
  pathName ? <span>{localization.menu[pathName]}</span> : null;

export default PathNameBreadcrumb;
