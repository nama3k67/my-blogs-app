import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import markdownStyles from "./style.module.css";

type Props = {
  content: string;
};

export function BlogDetails({ content }: Props) {
  const processedContent = content.replace(/\\n/g, "\n");

  return (
    <>
      <ReactMarkdown
        remarkPlugins={[remarkBreaks]}
        className={markdownStyles.markdown}
      >
        {processedContent}
      </ReactMarkdown>
    </>
  );
}
