import { useEffect, useState } from "react";
import { getHealth } from "../services/api";
import RepositoryForm from "../components/RepositoryForm";
import RepositoryTree from "../components/RepositoryTree";
import { getFileContent } from "../services/fileServices";
import FileViewer from "../components/FileViewer";
import ChatPanel from "../components/chat/ChatPanel";


export default function HomePage() {
  const [status, setStatus] = useState("Checking backend...");

  const [repositoryName, setRepositoryName] = useState("");

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
    if (!repositoryName) {
      return;
    }
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
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex h-screen max-w-[1600px] flex-col p-6">

        {/* Header */}
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              AI Codebase Assistant
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Analyze any GitHub repository locally with Ollama.
            </p>
          </div>

          <div className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300">
            {status}
          </div>
        </header>

        {/* Clone Repository */}
        <div className="mb-6 rounded-xl border border-slate-800 bg-slate-900 p-5">
          <RepositoryForm
            onRepositoryCloned={(repo) => {
              setRepositoryName(repo);
              setSelectedFile("");
              setFileContent("");
            }}
          />
        </div>

        {/* Dashboard */}
        <div className="grid min-h-0 flex-1 grid-cols-[300px_1fr] gap-6">

          {/* Sidebar */}
          <aside className="flex min-h-0 flex-col rounded-xl border border-slate-800 bg-slate-900">
            <div className="border-b border-slate-800 px-5 py-4">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                Explorer
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <RepositoryTree
                repositoryName={repositoryName}
                onFileClick={handleFileClick}
              />
            </div>
          </aside>

          {/* Main */}
          <section className="flex min-h-0 flex-col gap-6">

            <div className="flex-1 overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
              <FileViewer
                repositoryName={repositoryName}
                fileName={selectedFile}
                content={fileContent}
              />
            </div>

            <div className="h-[360px] overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
              <ChatPanel repositoryName={repositoryName} />
            </div>

          </section>

        </div>

      </div>
    </main>
  );
}