import type { TreeNode as TreeNodeType } from "../types/repository";

interface TreeNodeProps {
  node: TreeNodeType;
  level?: number;
  currentPath?: string;
  onFileClick: (path: string) => void;
}

export default function TreeNode({
  node,
  level = 0,
  currentPath = "",
  onFileClick,
}: TreeNodeProps) {
  const fullPath = currentPath
    ? `${currentPath}/${node.name}`
    : node.name;

  return (
    <div>
      <div
        className={`py-1 ${
          node.type === "file"
            ? "cursor-pointer hover:text-blue-400"
            : "font-semibold"
        }`}
        style={{ paddingLeft: `${level * 20}px` }}
        onClick={() => {
          if (node.type === "file") {
            onFileClick(fullPath);
          }
        }}
      >
        {node.name}
      </div>

      {node.type === "directory" &&
        node.children?.map((child) => (
          <TreeNode
            key={fullPath + child.name}
            node={child}
            level={level + 1}
            currentPath={fullPath}
            onFileClick={onFileClick}
          />
        ))}
    </div>
  );
}