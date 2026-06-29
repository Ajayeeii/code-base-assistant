import { useEffect, useState } from "react";
import { getHealth } from "../services/api";
import RepositoryForm from "../components/RepositoryForm";
import RepositoryTree from "../components/RepositoryTree";

export default function HomePage() {
  const [status, setStatus] = useState("Checking backend...");

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

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">
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

      <RepositoryTree repositoryName="fastapi.git" />
    </main>
  );
}