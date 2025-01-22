"use client";
import React, { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

const Home: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchChangelog = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/Plinkie03/NekoRPG/refs/heads/master/CHANGELOG.md?v=2'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch changelog');
        }
        const text = await response.text();
        setContent(text);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching the changelog');
      }
    };

    fetchChangelog();
  }, []);

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!content) {
    return <div>Loading...</div>;
  }

  const handleToggleSection = (version: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [version]: !prev[version],
    }));
  };

  return (
    <div className="markdown">
      <ReactMarkdown
        components={{
          h1: ({ children }) => <h1 className="md-heading-1">{children}</h1>,
          h2: ({ children }) => {
            const version = typeof children === 'string' ? children.trim().split(' ')[0] : 'defaultVersion';

            return (
              <h2
                className="md-heading-2 cursor-pointer"
                onClick={() => handleToggleSection(version)}
                id={version} // Set the id as the version for h2
              >
                {children}
                <span>{openSections[version] ? '▲' : '▼'}</span>
              </h2>
            );
          },
          h3: ({ children }) => {
            return <h3 className="md-heading-3">{children}</h3>;
          },
          ul: ({ children }) => {
            const ulRef = useRef<HTMLUListElement>(null);
            const [version, setVersion] = useState<string>('defaultVersion');

            useEffect(() => {
              if (ulRef.current) {
                // Find the closest preceding h2 element and get its id (version)
                const parentH2 = ulRef.current.closest('div')?.querySelector('h2');
                if (parentH2) {
                  setVersion(parentH2.id || 'defaultVersion');
                }
              }
            }, []);

            return (
              <ul
                ref={ulRef}
                className={`md-list version-${version}`}
                style={{ display: openSections[version] ? 'block' : 'none' }}
              >
                {children}
              </ul>
            );
          },
          a: ({ href, children }) => (
            <a href={href} className="md-custom-link" target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>

      <style jsx>{`
        .md-heading-2 {
          cursor: pointer;
        }

        .md-heading-3,
        .md-list {
          display: none;
        }

        ${Object.keys(openSections).map(
          (version) => `
            .version-${version} {
              display: ${openSections[version] ? 'block' : 'none'};
            }
          `
        ).join("\n")}

        .md-heading-2 span {
          margin-left: 8px;
        }
      `}</style>
    </div>
  );
};

export default Home;
