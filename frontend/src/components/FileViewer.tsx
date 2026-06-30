type FileViewerProps = {
  fileName: string;
  content: string;
};

export default function FileViewer({
  fileName,
  content,
}: FileViewerProps) {
  if (!fileName) {
    return null;
  }

  return (
    <div className="mt-8 w-full max-w-5xl rounded-lg border border-slate-700 p-4">
      <h2 className="mb-4 text-lg font-semibold">
        {fileName}
      </h2>

      <pre className="overflow-x-auto whitespace-pre-wrap text-sm">
        {content}
      </pre>
    </div>
  );
}