import { useEffect, useRef, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import debounce from "lodash/debounce";

export function useSearch(setSearchTerm: (term: string) => void) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  const debouncedSearch = useRef(
    debounce((term: string) => {
      if (term) {
        params.set("page", "1");
        params.set("search", term);
      } else {
        params.set("page", "1");
        params.delete("search");
      }
      startTransition(() => {
        replace(`${pathname}?${params.toString()}`);
      });
    }, 500)
  ).current;

  const onInputChange = (event: any) => {
    const term = event.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  const handleClear = () => {
    setSearchTerm("");
    params.delete("search");
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return { onInputChange, handleClear, isPending };
}
