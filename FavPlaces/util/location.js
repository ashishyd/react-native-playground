const GOOGLE_API_KEY = "AIzaSyAlm6SSCP1gfJg0ma_mchca1yx4ITeKzFg";

export function getMapPreview(lat, lon) {
  const imagePreview = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=14&size=400x200&maptype=roadmap
    &markers=color:red%7Clabel:S%7C${lat},${lon}&key=${GOOGLE_API_KEY}`;
  return imagePreview;
}

export async function getAddress(lat, lon) {
  const reverseGeoUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GOOGLE_API_KEY}`;
  const response = await fetch(reverseGeoUrl);

  if (!response.ok) {
    throw new Error("Failed to fetch address!");
  }

  const data = await response.json();
  const address = data.results[0].formatted_address;
  return address;
}
