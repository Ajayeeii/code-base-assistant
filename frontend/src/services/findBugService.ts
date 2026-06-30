const API_BASE_URL = "http://localhost:8000";

type FindBugResponse = {
  analysis: string;
};

export async function findBugs(
  repositoryName: string,
  path: string
): Promise<FindBugResponse> {
  const response = await fetch(
    `${API_BASE_URL}/repositories/${repositoryName}/find-bugs`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to analyze file");
  }

  return response.json();
}