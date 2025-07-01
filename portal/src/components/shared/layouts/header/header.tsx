import { getMainNav } from "@/interfaces";
import { NavMenu } from ".";
import { HomePageApis } from "@/services/api/page-services/home-page";

interface Props {
  lang: string;
}

export const Header: React.FC<Props> = async ({ lang }) => {
  const navigation = await getMainNav(lang);

  const { data } = await HomePageApis.get({
    queryParams: {
      populate: "deep",
      locale: lang,
      // fields: ["banner"],
    },
  });

  const { banner = {} } = data || {};

  return (
    <header className="fixed w-full top-0 z-40 lg:z-50">
      <NavMenu lang={lang} navigation={navigation} banner={banner} />
    </header>
  );
};
