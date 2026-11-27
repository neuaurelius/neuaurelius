import React from "react";
import Image from "next/image";
import katex from "katex";
import { urlFor } from "@/sanity/lib/image";

function renderKatexInline(formula, key) {
  try {
    const html = katex.renderToString(String(formula), {
      throwOnError: false,
      displayMode: false,
      output: "html",
    });
    return (
      <span
        key={key}
        className="inline-math"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  } catch {
    return formula;
  }
}

function renderTextWithInlineMathAndLinks(text) {
  if (typeof text !== "string") return text;

  const regex =
    /(\\\((.+?)\\\)|(?<!\\)(?<!\$)\$(?!\$)([^$\n]+?)(?<!\\)(?<!\$)\$(?!\$)|(https?:\/\/[^\s<>()]+))/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[2] !== undefined || match[3] !== undefined) {
      const formula = (match[2] ?? match[3]).trim();
      parts.push(renderKatexInline(formula, match.index));
    } else if (match[4] !== undefined) {
      const rawUrl = match[4];
      const cleanUrl = rawUrl.replace(/[.,;:!?)]+$/, "");
      const trailingPunct = rawUrl.slice(cleanUrl.length);
      parts.push(
        <a
          key={match.index}
          href={cleanUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="publication-external-link"
        >
          {cleanUrl}
        </a>
      );
      if (trailingPunct) parts.push(trailingPunct);
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

function processChildren(children) {
  return React.Children.map(children, (child) => {
    if (typeof child === "string") {
      return renderTextWithInlineMathAndLinks(child);
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
    normal: ({ value, children }) => (
      <p id={value?._key?.startsWith("ref-") ? value._key : undefined}>
        {processChildren(children)}
      </p>
    ),
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
    bullet: ({ value, children }) => (
      <li id={value?._key?.startsWith("ref-") ? value._key : undefined}>
        {processChildren(children)}
      </li>
    ),
    number: ({ value, children }) => (
      <li id={value?._key?.startsWith("ref-") ? value._key : undefined}>
        {processChildren(children)}
      </li>
    ),
  },

  marks: {
    inlineMath: ({ text, children }) => {
      const formula =
        typeof text === "string"
          ? text
          : Array.isArray(children)
            ? children.join("")
            : String(children || "");
      return renderKatexInline(formula);
    },
    link: ({ value, children }) => {
      const href = value?.href || "#";
      const isAnchor = href.startsWith("#");
      const isExternal =
        !isAnchor && value?.blank !== false && href.startsWith("http");

      return (
        <a
          href={href}
          className={
            isAnchor ? "publication-citation-link" : "publication-external-link"
          }
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
      if (!value?.latex?.trim()) return null;
      const html = katex.renderToString(value.latex, {
        throwOnError: false,
        displayMode: true,
        output: "html",
      });
      return (
        <div
          className="publication-math-block"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    },

    image: ({ value }) => {
      const imgUrl =
        value?.assetUrl ||
        (value?.asset?._ref
          ? urlFor(value).width(1400).fit("max").auto("format").url()
          : null);

      if (!imgUrl) return null;

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
                  <th key={idx}>{renderTextWithInlineMathAndLinks(cell)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row) => (
                <tr key={row._key}>
                  {row.cells.map((cell, idx) => (
                    <td key={idx}>{renderTextWithInlineMathAndLinks(cell)}</td>
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
