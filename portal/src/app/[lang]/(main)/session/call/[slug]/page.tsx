import { getData } from "@/services/zoom/getToken";
import Script from "next/script";
import VideocallWrapper from "./_components/videocallWrapper";


export default async function Page({ params }: { params: { slug: string } }) {
  const jwt = await getData(params.slug);
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-between p-24 mt-28">
      <VideocallWrapper slug={params.slug} JWT={jwt} />
      <Script src="/coi-serviceworker.js" strategy="beforeInteractive" />
    </main>
  );
}
