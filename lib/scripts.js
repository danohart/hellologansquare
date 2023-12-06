export async function getHappyHourData(place) {
  const response = await fetch("/api/gethappyhour");
  const data = await response.json();

  const whatIsTheSpecial = data.filter(({ name: id1 }) => place.name === id1);

  return whatIsTheSpecial.length > 0 ? whatIsTheSpecial[0] : "None";
}
