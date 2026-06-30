import { useEffect, useState } from "react";
import { getHealth } from "../services/api";
import RepositoryForm from "../components/RepositoryForm";
import RepositoryTree from "../components/RepositoryTree";
import { getFileContent } from "../services/fileServices";
import FileViewer from "../components/FileViewer";



export default function HomePage() {
  const [status, setStatus] = useState("Checking backend...");

  const repositoryName = "fastapi.git";

  const [selectedFile, setSelectedFile] = useState("");
  const [fileContent, setFileContent] = useState("");



  useEffect(() => {
    async function load() {
      try {
        const data = await getHealth();
        setStatus(data.message);
      } catch {
        setStatus("Backend unavailable");
      }
    }

    load();
  }, []);

  const handleFileClick = async (path: string) => {
    try {
      setSelectedFile(path);

      const data = await getFileContent(repositoryName, path);

      setFileContent(data.content);
    } catch (error) {
      console.error(error);
      setFileContent("Failed to load file.");
    }
  };

  console.log("HomePage repositoryName =", repositoryName);

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center p-6">
      <h1 className="text-5xl font-bold mb-4">
        AI Codebase Assistant
      </h1>

      <p className="mb-10 text-slate-400 text-center max-w-2xl">
        Clone a GitHub repository and analyze it locally with AI.
      </p>

      <div className="mb-8 rounded-lg border border-slate-700 px-6 py-3">
        {status}
      </div>

      <RepositoryForm />

      <RepositoryTree
        repositoryName={repositoryName}
        onFileClick={handleFileClick}
      />

      <FileViewer
        fileName={selectedFile}
        content={fileContent}
      />
    </main>
  );
}