import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import markdownStyles from "./styles.module.css";

type Props = {
  content: string;
};

export default function AboutContent({ content }: Props) {
  return (
    <ReactMarkdown
      className={markdownStyles.markdown}
      remarkPlugins={[remarkGfm]}
    >
      {content}
    </ReactMarkdown>
  );
}
