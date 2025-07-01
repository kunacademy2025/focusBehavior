"use server";

import { isAuthorized } from "@/auth";
import { ResetPasswordForm } from "@/components/shared/auth/reset-password";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

type Params = Promise<{ lang: string }>;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Reset Password",
  };
}

export default async function ChangePasswordPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: { [key: string]: string | undefined };
}) {
  const { lang } = await params;

  const { code } = searchParams;
  if (!code) notFound();

  const session = await isAuthorized();
  if (session && session.user) redirect("/");

  return (
    <div className="">
      <div className="relative w-full h-[20vh] py-10">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-neutral-950/90 to-neutral-950/0 from-[15%]" />
      </div>
      <div className="container mt-52 py-10 px-5 w-full lg:w-3/4 mx-auto border max-w-lg">
        <ResetPasswordForm code={code} lang={lang} />
      </div>
    </div>
  );
}
