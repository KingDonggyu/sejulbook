const runConvert = <T>(
  targetArray: T[],
  count: number,
  convertedArray: T[][],
): T[][] => {
  if (!targetArray.length) {
    return convertedArray;
  }

  convertedArray.push(targetArray.splice(0, count));

  return runConvert<T>(targetArray, count, convertedArray);
};

const convert1DArrayTo2DArray = <T>(targetArray: T[], count: number): T[][] =>
  runConvert([...targetArray], count, []);

export default convert1DArrayTo2DArray;
