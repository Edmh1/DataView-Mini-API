const API_BASE_URL = "http://localhost:8000";

export async function getPopulationData() {
  const response = await fetch(`${API_BASE_URL}/api/population`);
  if (!response.ok) {
    throw new Error("Error fetching population data");
  }
  return await response.json();
}
