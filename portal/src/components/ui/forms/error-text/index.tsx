export const ErrorText = ({ message }: { message: string }) => {
  return (
    <span className="mt-1 text-[13px] font-medium text-red-600">{message}</span>
  );
};
