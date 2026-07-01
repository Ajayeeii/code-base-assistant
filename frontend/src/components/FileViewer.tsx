import { useEffect, useState } from "react";
import { explainFile } from "../services/explainFileService";
import { findBugs } from "../services/findBugService";
import { improveCode } from "../services/improveCodeService";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


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
  const [bugLoading, setBugLoading] = useState(false);
  const [bugAnalysis, setBugAnalysis] = useState("");
  const [improveLoading, setImproveLoading] = useState(false);
  const [improvements, setImprovements] = useState("");

  useEffect(() => {
    setExplanation("");
    setBugAnalysis("");
    setImprovements("");
  }, [fileName]);

  if (!fileName) {
    return (
      <div className="flex h-full items-center justify-center text-slate-400">
        Select a file from the Explorer.
      </div>
    );
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

  async function handleFindBugs() {
    try {
      setBugLoading(true);

      const data = await findBugs(repositoryName, fileName);

      setBugAnalysis(data.analysis);
    } catch (error) {
      console.error(error);
      setBugAnalysis("Failed to analyze file.");
    } finally {
      setBugLoading(false);
    }
  }

  async function handleImproveCode() {
    try {
      setImproveLoading(true);

      const data = await improveCode(repositoryName, fileName);

      setImprovements(data.improvements);
    } catch (error) {
      console.error(error);
      setImprovements("Failed to generate improvement suggestions.");
    } finally {
      setImproveLoading(false);
    }
  }

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{fileName}</h2>

        <div className="flex gap-2">
          <button
            onClick={handleExplain}
            disabled={loading}
            className="rounded bg-blue-600 px-4 py-2 text-sm hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Explaining..." : "Explain"}
          </button>

          <button
            onClick={handleFindBugs}
            disabled={bugLoading}
            className="rounded bg-red-600 px-4 py-2 text-sm hover:bg-red-700 disabled:opacity-50"
          >
            {bugLoading ? "Analyzing..." : "Find Bugs"}
          </button>

          <button
            onClick={handleImproveCode}
            disabled={improveLoading}
            className="rounded bg-emerald-600 px-4 py-2 text-sm hover:bg-emerald-700 disabled:opacity-50"
          >
            {improveLoading ? "Analyzing..." : "Improve Code"}
          </button>
        </div>
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
            <div className="prose prose-invert max-w-none text-slate-300">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {explanation}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}

      {bugAnalysis && (
        <div className="mt-6 rounded-lg border border-slate-700 bg-slate-900 p-4">
          <h3 className="mb-3 text-lg font-semibold">
            AI Bug Analysis
          </h3>

          <div className="max-h-96 overflow-y-auto rounded bg-slate-950 p-3">
            <div className="prose prose-invert max-w-none text-slate-300">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {bugAnalysis}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}

      {improvements && (
        <div className="mt-6 rounded-lg border border-slate-700 bg-slate-900 p-4">
          <h3 className="mb-3 text-lg font-semibold">
            AI Improvement Suggestions
          </h3>

          <div className="max-h-96 overflow-y-auto rounded bg-slate-950 p-3">
            <div className="prose prose-invert max-w-none text-slate-300">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {improvements}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}