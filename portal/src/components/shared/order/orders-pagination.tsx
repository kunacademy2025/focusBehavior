"use server";
import Searchbar from "./searchbar";
import Pagination from "./pagination";
import { OrderCard } from "./order-card";
import { MetaModel } from "@/models/meta.model";
import { routes } from "@/config";

export const OrdersPagination: React.FC<{
  data: any;
  meta?: MetaModel;
  lang: string;
}> = async ({ data, meta, lang }) => {
  const pageCount = meta?.pageCount ?? 1;
  const page = meta?.page ?? 1;

  return (
    <>
      <div className="items-center mb-5 md:flex md:justify-between sm:mb-10">
        <h2 className="mb-4 text-sm font-semibold md:text-xl md:mb-0">
          {lang === "ar" ? "فعالياتي" : "My Events"}
        </h2>
        {/* <Searchbar /> */}
      </div>
      {pageCount > 1 && (
        <div className="my-5">
          <Pagination
            pageCount={pageCount}
            pageIndex={page}
            routeName={routes.accountEvents("")}
            className="my-5"
          />
        </div>
      )}
      <div className="order-list-table-wraper">
        {!data && data.length === 0 ? (
          <div className="p-10 font-bold">
            You don&apos;t have any events yet!
          </div>
        ) : (
          data?.map((item: any, index: number) => (
            <OrderCard key={index} item={item} lang={lang} />
          ))
        )}
      </div>
      <Pagination
        pageCount={pageCount}
        pageIndex={page}
        routeName={routes.accountEvents("")}
        className="mt-10"
      />
    </>
  );
};
