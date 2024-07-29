import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FiCopy, FiCheck } from "react-icons/fi";

const CopyCode = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /**
   * TSX
   */
  return (
    <div className="relative inline-block">
      <pre className="max-w-[7.5rem] overflow-hidden text-ellipsis whitespace-nowrap bg-gray-100 p-2 rounded">
        <code>{code}</code>
      </pre>
      <CopyToClipboard text={code} onCopy={handleCopy}>
        <button
          className={`absolute top-1 right-1  ${
            copied ? "bg-emerald-500" : "bg-blue-500"
          } text-white rounded px-2 py-1 flex items-center`}
        >
          {!copied ? <FiCopy size={20} /> : <FiCheck size={20} />}
        </button>
      </CopyToClipboard>
    </div>
  );
};

export default CopyCode;
