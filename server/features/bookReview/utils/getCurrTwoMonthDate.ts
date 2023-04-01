const addZeroPaddingToMonth = (month: number) => {
  if (month < 10) {
    return `0${month}`;
  }
  return `${month}`;
};

const getCurrTwoMonthDate = () => {
  const currDate = new Date();
  const currYear = currDate.getFullYear();
  const currMonth = currDate.getMonth() + 1;
  const prevYear = currMonth === 1 ? currYear - 1 : currYear;
  const prevMonth = currMonth === 1 ? 12 : currMonth - 1;

  return {
    currYear: `${currYear}`,
    prevYear: `${prevYear}`,
    currMonth: addZeroPaddingToMonth(currMonth),
    prevMonth: addZeroPaddingToMonth(prevMonth),
  };
};

export default getCurrTwoMonthDate;
