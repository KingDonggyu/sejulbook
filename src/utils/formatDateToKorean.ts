const checkDateParamType = (date: Date | string) => {
  if (typeof date === 'string') {
    return new Date(date);
  }
  return date;
};

const formatDateToKorean = (date: Date | string) => {
  const targetDate = checkDateParamType(date);
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth() + 1;
  const day = targetDate.getDate();

  return `${year}년 ${month}월 ${day}일`;
};

export default formatDateToKorean;
