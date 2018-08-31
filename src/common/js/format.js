export function paddingZero(src, digits = 2) {
  let str = src.toString(); // 转成str
  if (str.length < digits) {
    return paddingZero(`0${str}`, digits);
  }
  return str;
};

export function formatNumber(num) {
  num = Number(num);
  if (num < 10000) {
    return `${num}`;
  }
  return `${(num / 10000).toFixed(1)}万`;
};
