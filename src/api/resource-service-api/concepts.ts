import { resourceServiceApiGet } from './host';

export const getConcepts = () => resourceServiceApiGet('/concepts');

export const paramsToSearchBody = ({ ids }: any) => ({
  ids
});
