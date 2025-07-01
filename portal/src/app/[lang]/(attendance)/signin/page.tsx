"use server";
import { AdminLoginForm } from "@/components/shared/auth/login/admin-login";
import { getTranslation } from "@/i18n";

type Params = Promise<{ lang: string }>;

export default async function SignInPage({ params }: { params: Params }) {
  const { lang } = await params;
  const { t } = await getTranslation("common", lang);

  return (
    <div className="min-h-screen container max-w-xl w-full flex flex-col justify-center items-center">
      <div className="py-6">
        <h2 className="text-primary text-center text-2xl md:text-4xl">
          {t("forms.login_as_admin")}
        </h2>
      </div>
      <AdminLoginForm lang={lang} />
    </div>
  );
}
