const formatAgeRange = (ageRange: string) => {
  const regex = /[^0-9]/g;
  const str = ageRange.replace(regex, '');

  return `${str[0]}${str[1]}-${str[2]}${str[3]}`;
};

export default formatAgeRange;
