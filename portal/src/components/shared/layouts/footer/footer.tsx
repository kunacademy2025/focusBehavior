import { HomePageApis } from "@/services/api/page-services/home-page";
import { Menu } from ".";

interface Props {
  lang: string;
}

export const Footer: React.FC<Props> = async ({ lang }) => {
  const { data } = await HomePageApis.get({
    queryParams: {
      populate: "deep",
      locale: lang,
    },
  });

  const { footer_slogan, footer_intro } = data;
  return (
    <footer className="bg-[#0F0F0F] w-full">
      <Menu
        lang={lang}
        footer_slogan={footer_slogan}
        footer_intro={footer_intro}
      />
    </footer>
  );
};
