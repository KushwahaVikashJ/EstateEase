import { useState } from "react";
import copy from "clipboard-copy";
import { Button } from "./ui/button";
import { Share } from "lucide-react";

const CopyToClipboardButton = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    const currentUrl = window.location.href;
    try {
      await copy(currentUrl);
      setIsCopied(true);
    } catch (error) {
      console.error("Failed to copy text to clipboard", error);
    }
  };

  return (
    <Button onClick={handleCopyClick} className="flex gap-2">
      <Share /> {isCopied ? "Copied!" : "Share"}
    </Button>
  );
};

export default CopyToClipboardButton;
