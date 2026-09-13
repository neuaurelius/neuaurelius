"use client";

import { useState } from "react";

export default function ShareButton({ title, slug }) {
  const [copied, setCopied] = useState(false);

  async function share(event) {
    event.preventDefault();
    event.stopPropagation();

    const url = `${window.location.origin}/blogs/${slug}`;

    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }

      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Sharing can be cancelled by the user; no UI error is needed.
    }
  }

  return (
    <button className="publication-share" onClick={share} type="button">
      {copied ? "COPIED" : "SHARE"}
    </button>
  );
}
