export const newLineToBreak = (source: string) =>
  source?.replaceAll("\n", "<br />");
export const breakToNewLine = (source: string) =>
  source?.replaceAll("<br />", "\n");
