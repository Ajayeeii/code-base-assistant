const API_BASE_URL = "http://localhost:8000";

export async function getRepositoryTree(repositoryName: string) {
  const response = await fetch(
    `${API_BASE_URL}/repositories/${repositoryName}/tree`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch repository tree");
  }

  return response.json();
}