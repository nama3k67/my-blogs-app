import ReactMarkdown from "react-markdown";

import markdownStyles from "./style.module.css";

type Props = {
  content: string;
};

export function BlogDetails({ content }: Props) {
  return (
    <div className="max-w-2xl mx-auto">
      <ReactMarkdown className={markdownStyles.markdown}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
