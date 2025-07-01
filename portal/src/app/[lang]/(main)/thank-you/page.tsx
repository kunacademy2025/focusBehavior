"use server";

import { ThankYou } from "@/components/ui";

type Params = Promise<{ lang: string }>;

const Page = async ({ params }: { params: Params }) => {
  const { lang } = await params;

  return <ThankYou lang={lang} />;
};

export default Page;
