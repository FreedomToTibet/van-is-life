export async function getVans() {
  const response = await fetch('/api/vans');

  if (!response.ok) {
    throw new Error('Failed to fetch vans');
  }
  const data = await response.json();
  return data.vans;
}