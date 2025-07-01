"use client";

import { useModal } from "@/context/modal.context";
import { Button } from "@nextui-org/react";
import { GoShareAndroid } from "react-icons/go";

export const ShareButton = ({ title }: { title: string }) => {
  const { openModal } = useModal();

  return (
    <Button
      startContent={<GoShareAndroid className="w-5 h-5" />}
      variant="solid"
      className="text-primary bg-white font-medium"
      onPress={() => openModal("share", { title })}
    >
      Share
    </Button>
  );
};
