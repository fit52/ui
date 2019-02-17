export { default as formatRecords } from './records';
export { formatEvent, formatEvents } from './events';
export { formatRunner, formatRunners } from './runners';

export const sortCellValues = (cellA, cellB, info) => {
  const {
    compare, locale, sortDirection, sortStates,
  } = info;

  const sortA = cellA.sortValue ? cellA.sortValue : cellA;
  const sortB = cellB.sortValue ? cellB.sortValue : cellB;

  if (sortDirection === sortStates.DESC) {
    return compare(sortB, sortA, locale);
  }

  return compare(sortA, sortB, locale);
};

export const formatTableCell = cellValue => (cellValue.value ? cellValue.value : cellValue);
