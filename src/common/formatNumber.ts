/********************************************************************************************************************
 * 숫자 또는 문자열로 주어진 숫자에 콤마 추가하는 함수
 * @param v 숫자 또는 문자열
 * @returns 콤마 추가된 문자열
 * ******************************************************************************************************************/
export function formatNumber(v: string | number): string {
  const strValue = String(v)
    .trim()
    .replace(/[^\d.+-]/g, '');

  const match = strValue.match(/^([+-]?)(\d+)(\.\d+)?$/);
  if (!match) return strValue;

  const sign = match[1];
  const intPart = match[2];
  let decimalPart = match[3] || '';

  if (/^\.0+$/.test(decimalPart)) {
    decimalPart = '';
  }

  const formattedInt = Number(intPart).toLocaleString();

  return `${sign}${formattedInt}${decimalPart}`;
}

export default formatNumber;
