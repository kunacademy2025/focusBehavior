"use client";

import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "./reset-password-schema";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { resetPassword } from "@/services/api/collections/user/auth";

export const ResetPassword = ({ code }: { code: string }) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const { handleSubmit, control, reset } = useForm<any>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const router = useRouter();

  const onSubmit = async (submittedData: any) => {
    try {
      setLoading(true);
      const { newPassword, passwordConfirmation } = submittedData;
      const resp = await resetPassword(code, newPassword, passwordConfirmation);
      if (!resp) toast.error("Couldn't change your password!");
      else {
        toast.success("Password changed successfully!");
        router.replace("/");
      }
      setLoading(false);
    } catch (ex) {
      console.error(ex);
    }
  };

  const inputClass = {
    label: "text-mediumGray",
    input: [
      "bg-transparent outline-none border-none",
      "text-darkGray",
      "placeholder:text-mediumGray",
      "focus:ring-0 focus:outline-none",
    ],
    innerWrapper: "bg-transparent",
    inputWrapper: [
      "bg-veryLightGray ring-1 ring-gray-200 rounded-lg",
      "!cursor-text transition-all duration-300",
      "focus-within:ring-2 focus-within:ring-primary",
    ],
  };

  return (
    <div className="global-container-2xl w-full h-full py-16 overflow-hidden">
      <div className="flex flex-col w-full lg:w-1/2 mx-auto">
        <h3 className="text-primary font-medium text-xl lg:text-2xl mb-4">
          Change Password
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center w-full mx-auto"
          noValidate
        >
          <div className="pb-7 md:pb-8 lg:pb-10 px-2 pt-4">
            <div className="flex flex-col gap-y-4 sm:gap-y-5">
              <div className="grid grid-cols-1 gap-4">
                <Controller
                  name="newPassword"
                  control={control}
                  render={({ field, fieldState: { invalid, error } }) => (
                    <Input
                      {...field}
                      variant={"flat"}
                      placeholder="Enter your new password"
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibility}
                          aria-label="toggle password visibility"
                        >
                          {isVisible ? (
                            <RiEyeOffFill className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <RiEyeFill className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                      }
                      type={isVisible ? "text" : "password"}
                      classNames={inputClass}
                      isInvalid={invalid}
                      errorMessage={
                        error?.message || "Please enter your new password"
                      }
                    />
                  )}
                />
                <Controller
                  name="passwordConfirmation"
                  control={control}
                  render={({ field, fieldState: { invalid, error } }) => (
                    <Input
                      {...field}
                      variant={"flat"}
                      placeholder="Confirm your new password"
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibility}
                          aria-label="toggle password visibility"
                        >
                          {isVisible ? (
                            <RiEyeOffFill className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <RiEyeFill className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                      }
                      type={isVisible ? "text" : "password"}
                      classNames={inputClass}
                      isInvalid={invalid}
                      errorMessage={
                        error?.message || "Please confirm your new password"
                      }
                    />
                  )}
                />
              </div>
            </div>
          </div>

          <div className="relative flex justify-end w-full pb-2 mt-5 sm:ltr:ml-auto sm:rtl:mr-auto lg:pb-0">
            <Button
              type="submit"
              variant="solid"
              isLoading={isLoading}
              className="bg-primary text-white font-medium px-8 py-2 rounded-lg"
            >
              Apply
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
