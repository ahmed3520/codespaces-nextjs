import { useRouter } from "next/router";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);
const EditerMarkdown = dynamic(
  () =>
    import("@uiw/react-md-editor").then((mod) => {
      return mod.default.Markdown;
    }),
  { ssr: false }
);
const Markdown = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  { ssr: false }
);

const FilePage = ({ fileData }) => {
  const router = useRouter();
  const { id } = router.query;
  console.log("fileData=>", fileData);
  // Extract the first line of the Markdown content as the title
  console.log(`fileData?.text.split("\n")[0]=>`, fileData?.text.split("#"));
  const title = fileData?.text.split("\n")[0].replace("# ", "");

  // State to hold the table of contents
  const [toc, setToc] = useState([]);

  // Parse the markdown content and generate the table of contents
  useEffect(() => {
    if (fileData?.text) {
      const lines = fileData.text.split("\n");
      const toc = lines.reduce((acc, line) => {
        const match = line.match(/^#+\s+(.+)/);
        if (match) {
          const level = line.match(/^#+/)[0].length;
          const text = match[1];
          const id = text.toLowerCase().replace(/\W+/g, "-");
          acc.push({ level, text, id });
        }
        return acc;
      }, []);
      setToc(toc);
    }
  }, [fileData]);
  return (
    <div className="document-wr">
      <div data-color-mode="dark" className="dark">
        <div style={{ paddingTop: 50 }}>
          <Markdown source={fileData.text} />
        </div>
      </div>
      {/* Render the title and content of the file here */}
      {/* <div className="flex titles">
    <div className="markdown"></div>
    <div
      className="w-1/2 text-right"
      style={{ position: "fixed", top: 0, right: 0 }}
    >
      <h2>{title}</h2>
      <ul>
        {toc.map((item) => (
          <li key={item.id} style={{ marginLeft: (item.level - 1) * 20 }}>
            <a href={`#${item.id}`}>{item.text}</a>
          </li>
        ))}
      </ul>
    </div>
  </div> */}
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
  // Fetch the data for the file using the id
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/file-content/${id}`
  );
  const data = await response.json();
  console.log("data=>", data);
  const fileData = data.response;

  return {
    props: {
      fileData,
    },
  };
}

export default FilePage;
