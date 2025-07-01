import { useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function usePagination() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  const page = Number(params.get("page")) || 1;
  const size = Number(params.get("size")) || 10;

  const handlePaginate = (pageNumber: number) => {
    params.set("page", pageNumber.toString());
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  const handlePageSize = (newSize: number) => {
    params.set("page", "1");
    params.set("size", newSize.toString());
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  return { page, size, handlePaginate, handlePageSize, isPending };
}
