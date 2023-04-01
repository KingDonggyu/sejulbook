const checkDateParamType = (date: Date | string) => {
  if (typeof date === 'string') {
    return new Date(date);
  }
  return date;
};

const addZeroPaddingToNumber = (number: number) => {
  if (number < 10) {
    return `0${number}`;
  }
  return `${number}`;
};

const getSQLFormattedDate = (date: Date | string) => {
  const targetDate = checkDateParamType(date);
  const year = targetDate.getFullYear();
  const month = addZeroPaddingToNumber(targetDate.getMonth() + 1);
  const day = addZeroPaddingToNumber(targetDate.getDate());

  return `${year}-${month}-${day}`;
};

export default getSQLFormattedDate;
