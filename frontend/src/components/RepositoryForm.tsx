import { useState } from "react";
import type { SyntheticEvent } from "react";
import { cloneRepository } from "../services/repositoryServices";

interface RepositoryFormProps {
  onRepositoryCloned: (repositoryName: string) => void;
}

export default function RepositoryForm({
  onRepositoryCloned,
}: RepositoryFormProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const result = await cloneRepository({ url });

      console.log("Clone response:", result);

      setMessage(result.message);
      onRepositoryCloned(result.repository);
      setUrl("");
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl space-y-4"
    >
      <input
        type="url"
        placeholder="https://github.com/user/project"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full rounded-md border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-blue-600 px-5 py-3 font-medium hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Cloning..." : "Clone Repository"}
      </button>

      {message && (
        <p className="text-sm text-slate-300">
          {message}
        </p>
      )}
    </form>
  );
}