const API_BASE_URL = "http://localhost:8000";

type ExplainFileResponse = {
  explanation: string;
};

export async function explainFile(
  repositoryName: string,
  path: string
): Promise<ExplainFileResponse> {
  const response = await fetch(
    `${API_BASE_URL}/repositories/${repositoryName}/explain`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to explain file");
  }

  return response.json();
}