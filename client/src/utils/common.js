export const removeDuplicate = (array) => {
  // can use SET API but not used considering IE 10 browser support
  const newObj = {};
  for (let arr of array) {
    newObj[arr] = true;
  }
  return Object.keys(newObj);
}