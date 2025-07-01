"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
  FC,
} from "react";
import { SearchModal, ShareModal } from "@/components/ui/modals";
import { ForgetPasswordDrawer } from "@/components/shared/auth/forgot-password/forget-password-drawer";
import { CartDrawer } from "@/components/shared/cart/cart-drawer";
import { PopupVideo } from "@/components/ui";
import { LoginDrawer } from "@/components/shared/auth/login/login-drawer";
import { RegisterDrawer } from "@/components/shared/auth/register/register-drawer";

type ModalKey =
  | "share"
  | "video"
  | "search"
  // | "lead"
  // | "contact"
  | "login"
  | "register"
  | "forget_password"
  | "cart";

interface ModalPayloads {
  share?: Record<string, unknown>;
  video?: Record<string, unknown>;
  search?: undefined;
  // lead?: Record<string, unknown>;
  // contact?: Record<string, unknown>;
  login?: undefined;
  register?: undefined;
  forget_password?: undefined;
  cart?: undefined;
}

interface ModalContextType {
  openModal: <T extends ModalKey>(key: T, payload?: ModalPayloads[T]) => void;
  closeModal: (key: ModalKey) => void;
  isOpen: (key: ModalKey) => boolean;
  getPayload: <T extends ModalKey>(key: T) => ModalPayloads[T] | null;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const modalsConfig: Record<
  ModalKey,
  FC<{ isOpen: boolean; setOpen: () => void; payload?: unknown }>
> = {
  search: SearchModal,
  share: ShareModal,
  video: PopupVideo,
  // lead: LeadModal,
  // contact: ContactModal,
  login: LoginDrawer,
  register: RegisterDrawer,
  forget_password: ForgetPasswordDrawer,
  cart: CartDrawer,
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<Record<ModalKey, boolean>>({
    share: false,
    video: false,
    search: false,
    // lead: false,
    // contact: false,
    login: false,
    register: false,
    forget_password: false,
    cart: false,
  });

  const [payloads, setPayloads] = useState<ModalPayloads>({});

  const openModal = <T extends ModalKey>(
    key: T,
    payload?: ModalPayloads[T]
  ) => {
    setModals((prev) => ({ ...prev, [key]: true }));
    if (payload) {
      setPayloads((prev) => ({ ...prev, [key]: payload }));
    }
  };

  const closeModal = (key: ModalKey) => {
    setModals((prev) => ({ ...prev, [key]: false }));
    setPayloads((prev) => ({ ...prev, [key]: null }));
  };

  const isOpen = (key: ModalKey) => modals[key];

  const getPayload = <T extends ModalKey>(key: T): ModalPayloads[T] | null =>
    payloads[key] || null;

  const renderedModals = useMemo(() => {
    return Object.entries(modalsConfig).map(([key, Component]) => {
      const modalKey = key as ModalKey;
      return (
        isOpen(modalKey) && (
          <Component
            key={modalKey}
            isOpen={true}
            setOpen={() => closeModal(modalKey)}
            payload={getPayload(modalKey)}
          />
        )
      );
    });
  }, [modals, payloads]);

  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, isOpen, getPayload }}
    >
      {children}
      {renderedModals}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
