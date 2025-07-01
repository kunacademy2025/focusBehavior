import { parseContent } from "@/utils";

export const Content = ({
  content,
  className,
}: {
  content: string;
  className?: string;
}) => {
  return <div className={className}>{parseContent(content)}</div>;
};
