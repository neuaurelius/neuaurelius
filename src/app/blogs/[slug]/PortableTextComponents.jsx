"use client";

import React from "react";
import Image from "next/image";
import katex from "katex";
import createImageUrlBuilder from "@sanity/image-url";

const builder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
});

function urlFor(source) {
  return builder.image(source);
}

// Renders \( ... \) and $ ... $ inside any text string
function renderTextWithInlineMath(text) {
  if (typeof text !== "string") return text;

  const regex = /(\\\((.+?)\\\)|\$([^$\n]+?)\$)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const formula = match[2] || match[3];
    try {
      const html = katex.renderToString(formula, {
        throwOnError: false,
        displayMode: false,
      });
      parts.push(
        <span
          key={match.index}
          className="inline-math"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    } catch {
      parts.push(match[0]);
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

// Recursively traverses React children so bold/italic spans containing math also render
function processChildren(children) {
  return React.Children.map(children, (child) => {
    if (typeof child === "string") {
      return renderTextWithInlineMath(child);
    }
    if (React.isValidElement(child) && child.props?.children) {
      return React.cloneElement(child, {
        children: processChildren(child.props.children),
      });
    }
    return child;
  });
}

export const portableTextComponents = {
  block: {
    normal: ({ children }) => <p>{processChildren(children)}</p>,
    h1: ({ children }) => <h1>{processChildren(children)}</h1>,
    h2: ({ children }) => <h2>{processChildren(children)}</h2>,
    h3: ({ children }) => <h3>{processChildren(children)}</h3>,
    blockquote: ({ children }) => (
      <blockquote>{processChildren(children)}</blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },

  listItem: {
    bullet: ({ children }) => <li>{processChildren(children)}</li>,
    number: ({ children }) => <li>{processChildren(children)}</li>,
  },

  marks: {
    link: ({ value, children }) => {
      const href = value?.href || "#";
      const isExternal = value?.blank !== false && href.startsWith("http");
      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {processChildren(children)}
        </a>
      );
    },
  },

  types: {
    latexBlock: ({ value }) => {
      if (!value?.latex) return null;
      const html = katex.renderToString(value.latex, {
        throwOnError: false,
        displayMode: true,
      });
      return (
        <div
          className="publication-math-block"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    },

    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      const imgUrl = urlFor(value).width(1400).fit("max").auto("format").url();

      return (
        <figure className="publication-inline-figure">
          <Image
            src={imgUrl}
            alt={value.alt || "Publication figure"}
            width={1200}
            height={675}
            sizes="(max-width: 768px) 100vw, 840px"
            style={{ width: "100%", height: "auto" }}
          />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      );
    },

    table: ({ value }) => {
      if (!value?.rows?.length) return null;
      const [headerRow, ...bodyRows] = value.rows;

      return (
        <div className="publication-table-wrapper">
          <table className="publication-table">
            <thead>
              <tr>
                {headerRow.cells.map((cell, idx) => (
                  <th key={idx}>{renderTextWithInlineMath(cell)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row) => (
                <tr key={row._key}>
                  {row.cells.map((cell, idx) => (
                    <td key={idx}>{renderTextWithInlineMath(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },

    divider: () => <hr className="publication-divider" />,
  },
};
