export function indianToUSFormat(indianDate) {
  const [day, month, year] = indianDate.split('/');

  return `${month}/${day}/${year}`;
}
