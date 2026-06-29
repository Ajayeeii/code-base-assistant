const API_BASE_URL = "http://localhost:8000";

export interface CloneRepositoryRequest {
  url: string;
}

export async function cloneRepository(
  data: CloneRepositoryRequest
) {
  const response = await fetch(
    `${API_BASE_URL}/repositories/clone`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || "Failed to clone repository.");
  }

  return result;
}