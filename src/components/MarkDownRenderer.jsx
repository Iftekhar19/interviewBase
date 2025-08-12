import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

import { Clipboard, Check } from "lucide-react";

export default function MarkdownRenderer({ content }) {
  return (
    <div className="prose prose-sm sm:prose-base max-w-none text-gray-900 dark:text-gray-100  pl-2">
      <ReactMarkdown
        components={{
          code({ inline, children, ...props }) {
            const codeText = String(children).trim();

            const isFakeBlock = !inline && codeText.length < 30 && !codeText.includes("\n");

            if (inline || isFakeBlock) {
              return (
                <code className="text-sm text-gray-800 font-mono">
                  {codeText}
                </code>
              );
            }

            return <CodeBlock>{codeText}</CodeBlock>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

function CodeBlock({ children }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(children).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative my-4 group">
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 bg-white text-gray-700 border border-gray-300 rounded p-1 hover:bg-gray-100 transition opacity-0 group-hover:opacity-100"
        title="Copy code"
      >
        {copied ? <Check size={16} /> : <Clipboard size={16} />}
      </button>
      <pre className="bg-[#0d1117] text-gray-100 p-4 rounded-md text-sm font-mono whitespace-pre-wrap overflow-x-auto">
        <code>{children}</code>
      </pre>
    </div>
  );
}
