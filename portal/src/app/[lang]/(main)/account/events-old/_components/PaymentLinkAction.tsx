import { useEffect, useState } from "react";
import Link from "next/link";
import { encrypt } from "@/services";
import { getStrapiId } from "@/utils";
import { routes } from "@/config";
import { FiExternalLink } from "react-icons/fi";

export const PaymentActionLink = ({ payment }: { payment: any }) => {
  const [encryptedId, setEncryptedId] = useState("");

  useEffect(() => {
    const run = async () => {
      const id = getStrapiId(payment);
      const encrypted = await encrypt(id.toString());
      setEncryptedId(encrypted);
    };
    run();
  }, [payment]);

  if (!encryptedId) return <>...</>; // Optional: add a skeleton or loader

  return (
    <Link
      href={`${routes.payment()}?id=${encryptedId}`}
      className="text-blue-600 underline inline-flex items-center gap-1 hover:text-blue-800"
    >
      {payment.payment_status}
      <FiExternalLink className="w-4 h-4" />
    </Link>
  );
};
