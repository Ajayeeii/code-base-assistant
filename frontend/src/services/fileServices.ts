const API_BASE_URL = "http://localhost:8000";

export async function getFileContent(
  repositoryName: string,
  path: string
) {
  const response = await fetch(
    `${API_BASE_URL}/repositories/${repositoryName}/file?path=${encodeURIComponent(path)}`
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || "Failed to load file.");
  }

  return result;
}