const API_BASE_URL = "http://localhost:8000";

export async function improveCode(
  repositoryName: string,
  path: string
) {
  const response = await fetch(
    `${API_BASE_URL}/repositories/${repositoryName}/improve`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path,
      }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || "Failed to improve code.");
  }

  return result;
}