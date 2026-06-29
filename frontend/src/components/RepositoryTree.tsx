import { useEffect, useState } from "react";
import { getRepositoryTree } from "../services/repositoryTreeServices";

type RepositoryTreeProps = {
  repositoryName: string;
};

export default function RepositoryTree({
  repositoryName,
}: RepositoryTreeProps) {
  const [tree, setTree] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const data = await getRepositoryTree(repositoryName);
        setTree(data);
      } catch {
        setError("Failed to load repository tree.");
      } finally {
        setLoading(false);
      }
    };

    fetchTree();
  }, [repositoryName]);

  if (loading) {
    return <p>Loading repository tree...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <pre className="mt-4 overflow-auto rounded bg-gray-100 p-4 text-sm">
      {JSON.stringify(tree, null, 2)}
    </pre>
  );
}