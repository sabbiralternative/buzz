import copy from "copy-to-clipboard";

export const handleCopyToClipBoard = (text, setMessage) => {
  copy(text);
  setMessage('Copied to clipboard.');
};
