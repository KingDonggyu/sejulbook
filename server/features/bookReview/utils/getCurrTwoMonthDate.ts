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
  const nextYear = currMonth === 12 ? currYear + 1 : currYear;
  const nextMonth = currMonth === 12 ? 1 : currMonth + 1;

  return {
    currYear: `${currYear}`,
    nextYear: `${nextYear}`,
    currMonth: addZeroPaddingToMonth(currMonth),
    nextMonth: addZeroPaddingToMonth(nextMonth),
  };
};

export default getCurrTwoMonthDate;
