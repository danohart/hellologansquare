export default function Capitalize(string) {
  const conversionOfFirstLetter = string[0].toUpperCase() + string.substring(1);
  return conversionOfFirstLetter;
}
