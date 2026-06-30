import { useEffect, useState } from "react";
import { explainFile } from "../services/explainFileService";

type FileViewerProps = {
  repositoryName: string;
  fileName: string;
  content: string;
};

export default function FileViewer({
  repositoryName,
  fileName,
  content,
}: FileViewerProps) {
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState("");

  useEffect(() => {
    setExplanation("");
  }, [fileName]);

  if (!fileName) {
    return null;
  }

  async function handleExplain() {
    try {
      setLoading(true);

      const data = await explainFile(repositoryName, fileName);

      setExplanation(data.explanation);
    } catch (error) {
      console.error(error);
      setExplanation("Failed to generate explanation.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 w-full max-w-5xl rounded-lg border border-slate-700 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{fileName}</h2>

        <button
          onClick={handleExplain}
          disabled={loading}
          className="rounded bg-blue-600 px-4 py-2 text-sm hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Explaining..." : "Explain"}
        </button>
      </div>

      <pre className="overflow-x-auto whitespace-pre-wrap text-sm">
        {content}
      </pre>

      {explanation && (
        <div className="mt-6 rounded-lg border border-slate-700 bg-slate-900 p-4">
          <h3 className="mb-3 text-lg font-semibold">
            AI Explanation
          </h3>

          <div className="max-h-96 overflow-y-auto rounded bg-slate-950 p-3">
            <p className="whitespace-pre-wrap leading-7 text-slate-300">
              {explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}