"use client";
import { Empty } from "rizzui";
import { FC, useEffect, useState } from "react";
import { CardHorizontalSkeleton, CardSkeleton } from "@/components/ui";
import { getMyWishlist } from "@/actions";
import { useUserInfo } from "@/hooks";
import { WishlistCard } from "../card/wishlist-card";
import { useTranslation } from "@/i18n/client";

interface Props {
  selectedPage: number;
  lang: string;
}

export const MyWishlist: FC<Props> = ({ selectedPage, lang }) => {
  const [items, setItems] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pageIndex, setPageIndex] = useState<number>(selectedPage);
  const { t } = useTranslation("common", lang);

  const { user } = useUserInfo();

  useEffect(() => {
    const fetchData = async (size: number, index: number) => {
      setIsLoading(true);
      const data = await getMyWishlist(size, index, "", user?.id);

      if (data) setItems(data);
      setIsLoading(false);
    };
    fetchData(6, pageIndex);
  }, [pageIndex, user]);

  const handlePageChange = (page: number) => setPageIndex(page);

  return (
    <section className="overflow-hidden">
      <div className="global-container-2xl w-full h-full py-4">
        <h3 className="text-primary font-medium text-xl lg:text-2xl mb-4">
          {t("elements.account.my_wishlist")}
        </h3>
        <div className="flex items-start gap-x-4 ">
          <div className="w-full h-full">
            <div className="grid grid-cols-1 gap-x-4 gap-y-4 ">
              {isLoading ? (
                Array.from(Array(6).keys()).map((_, index: number) => (
                  <CardHorizontalSkeleton key={index} />
                ))
              ) : Array.isArray(items) && items.length > 0 ? (
                items?.map((item: any, index: number) => (
                  <WishlistCard key={index} item={item} lang={lang} />
                ))
              ) : (
                <div className="col-span-full">
                  <Empty text="No Data" textClassName="mt-2 py-6" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* <div className="ml-auto w-full grid place-content-center mt-4">
          <Pagination
            meta={items?.meta?.pagination}
            handleChange={handlePageChange}
          />
        </div> */}
      </div>
    </section>
  );
};
