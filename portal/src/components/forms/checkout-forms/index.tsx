"use client";

import { useState } from "react";
import { Controller } from "react-hook-form";
import { CheckoutFormInput, checkoutSchema, defaultValue } from "./schema";
import toast from "react-hot-toast";
import { cn } from "@/utils";
import { useUserInfo } from "@/hooks";
import { useTranslation } from "@/i18n/client";
import { useForms } from "@/hooks/useForms";
import { checkoutFormAction } from "./action";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/forms";
import { Input } from "@/components/ui/forms/input";
import { TextArea } from "@/components/ui/forms/text-area";
import { PhoneInput } from "@/components/ui/forms/phone-input";
import { Combobox } from "@/components/ui/forms/combobox";
import { CheckoutSummary } from "./checkout-summary";
import { getCountriesList } from "@/utils/getCountries";
import { Dialog } from "@/components/ui/dialog";

export const CheckoutForm = ({ lang }: { lang?: string }) => {
  const [message, setMessage] = useState("");
  const { t } = useTranslation("common", lang);
  const { push } = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    state: formState,
    formAction,
    isPending,
    countryCode,
    captcha,
  } = useForms(checkoutFormAction, { success: false });

  const countries = getCountriesList();
  const defaultCountry: any = countries.find((c) => c.code === countryCode);
  const countryOptions = countries.map(({ name }) => ({
    label: name,
    value: name,
  }));

  const { user } = useUserInfo();

  return (
    <>
      <Form<CheckoutFormInput>
        action={formAction}
        state={formState}
        suppressToastMessage={true}
        validationSchema={checkoutSchema}
        useFormProps={{
          mode: "onChange",
          defaultValues: defaultValue(user, defaultCountry),
        }}
        onSuccess={({ reset, data, fields }) => {
          if (data.payment_lnk_created) {
            if (data.remote_pay_link) {
              toast.success("Redirecting to payment...");
              push(data.remote_pay_link);
            }
          } else {
            toast.error(data?.pay_link_msg ?? "Failed to create payment link.");
            setMessage(data.pay_link_msg ?? "Failed to create payment link.");
            if (data.payment_link) {
              push(data.payment_link);
            }
            setIsDialogOpen(true);
          }
          reset();
        }}
        className="grid grid-cols-1 lg:grid-cols-2 py-10"
      >
        {({ register, control, setValue, formState: { errors } }) => {
          return (
            <>
              <div className="flex flex-col">
                <h3 className={cn("text-primary font-medium text-4xl")}>
                  {t("titles.secure_checkout")}
                </h3>

                <div className="mt-8 pb-6 flex flex-col gap-y-4">
                  <button onClick={() => setIsDialogOpen(true)}>OPEN</button>
                  <Input
                    label={t("forms.email_for_billing")}
                    placeholder={t("forms.email")}
                    type="email"
                    {...register("email")}
                    error={errors?.email?.message as string}
                    required
                  />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label={t("forms.first_name")}
                      placeholder={t("forms.first_name")}
                      {...register("first_name")}
                      error={errors?.first_name?.message as string}
                      required
                    />
                    <Input
                      label={t("forms.last_name")}
                      placeholder={t("forms.last_name")}
                      {...register("last_name")}
                      error={errors?.last_name?.message as string}
                      required
                    />
                    <PhoneInput
                      control={control}
                      id="phone_number"
                      label={t("forms.phone_number")}
                      placeholder={t("forms.phone_number")}
                      error={errors?.phone_number?.message as string}
                      defaultCountry={countryCode ?? "LB"}
                      required
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label={t("forms.stree_address_1")}
                      placeholder={t("forms.stree_address_1")}
                      {...register("address_line_1")}
                      error={errors?.address_line_1?.message as string}
                      required
                    />
                    <Input
                      label={t("forms.stree_address_2")}
                      placeholder={t("forms.stree_address_2")}
                      {...register("address_line_2")}
                      error={errors?.address_line_2?.message as string}
                    />
                    <Input
                      label={t("forms.city")}
                      placeholder={t("forms.city")}
                      {...register("city")}
                      error={errors?.city?.message as string}
                      required
                    />
                    <Input
                      label={t("forms.state_province")}
                      placeholder={t("forms.state_province")}
                      {...register("state")}
                      error={errors?.state?.message as string}
                    />
                    <Controller
                      name="country"
                      control={control}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <>
                          <Combobox
                            label={t("forms.country")}
                            placeholder={t("forms.country")}
                            options={countryOptions}
                            className="w-full !bg-white"
                            value={value}
                            onChange={onChange}
                            required
                            error={error?.message as string}
                          />
                          <input
                            type="hidden"
                            name="country"
                            value={String(value)}
                          />
                        </>
                      )}
                    />
                    <Input
                      label={t("forms.zip_code")}
                      placeholder={t("forms.zip_code")}
                      {...register("zip")}
                      error={errors?.zip?.message as string}
                    />
                  </div>

                  <div className="grid gap-4">
                    <TextArea
                      label={t("forms.notes")}
                      placeholder={t("forms.notes")}
                      {...register("notes")}
                      error={errors?.notes?.message as string}
                    />
                  </div>
                </div>

                {/* <input type="hidden" {...register(`captcha`)} value={captcha} /> */}
                <input
                  type="hidden"
                  {...register(`customer`)}
                  value={user.id}
                />
              </div>
              <CheckoutSummary
                lang={lang}
                isPending={isPending}
                register={register}
              />
            </>
          );
        }}
      </Form>

      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title={t("forms.payment_error")}
      >
        <p className="mb-2">{message}</p>
        <button
          onClick={() => setIsDialogOpen(false)}
          className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
        >
          {t("forms.close")}
        </button>
      </Dialog>
    </>
  );
};
