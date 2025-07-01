export const highlightText = (text: string, searchTerm: string) => {
  if (!text) return "";
  const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
  return parts.map((part, index) =>
    part.toLowerCase() === searchTerm.toLowerCase() ? (
      <span
        key={index}
        className="font-semibold border-b-2 border-blue-300 text-blue-500"
      >
        {part}
      </span>
    ) : (
      part
    )
  );
};
