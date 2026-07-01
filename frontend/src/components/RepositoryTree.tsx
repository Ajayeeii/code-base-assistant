import { useEffect, useState } from "react";
import { getRepositoryTree } from "../services/repositoryTreeServices";
import type { TreeNode } from "../types/repository";
import TreeNodeComponent from "./TreeNode";

type RepositoryTreeProps = {
  repositoryName: string;
  onFileClick: (path: string) => void;
};

export default function RepositoryTree({
  repositoryName,
  onFileClick,
}: RepositoryTreeProps) {
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!repositoryName) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    const fetchTree = async () => {
      try {
        const data = await getRepositoryTree(repositoryName);
        setTree(data);
      } catch (error) {
        console.error(error);
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
    <div className="w-full text-sm">
      {tree.map((node) => (
        <TreeNodeComponent
          key={node.name}
          node={node}
          onFileClick={onFileClick}
        />
      ))}
    </div>
  );
}