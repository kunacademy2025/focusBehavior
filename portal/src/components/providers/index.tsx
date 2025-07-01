import { AppProvider, ModalProvider } from "@/context";
import { NextuiProvider } from "./nextui-provider";
import { RecaptchaProviders } from "./recaptcha-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RecaptchaProviders>
      <NextuiProvider>
        <ModalProvider>{children}</ModalProvider>
      </NextuiProvider>
    </RecaptchaProviders>
  );
}
