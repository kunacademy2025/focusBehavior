export const sliceSentence = (source: string, length: number): string => {
  const lst = source.split(" ");
  let result = "";
  let index = 1;
  while (result.length < length) {
    result = lst.slice(0, index).join(" ");
    index++;
  }
  return result;
};
