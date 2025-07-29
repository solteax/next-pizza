import { useTranslations } from "next-intl"
import { z } from "zod"

export function useCheckoutFormSchema() {
  const t = useTranslations("checkout.validation")

  return z.object({
    firstName: z
      .string()
      .min(2, { message: t("name") })
      .max(50, { message: t("maxName") }),
    lastName: z
      .string()
      .min(2, { message: t("lastName") })
      .max(50, { message: t("maxLastName") }),
    email: z
      .string()
      .email({ message: t("email") })
      .max(100, { message: t("maxEmail") }),
    phone: z // move logic to FormInput component
      .string()
      .min(1, { message: t("emptyPhone") }),
    address: z
      .string()
      .min(5, { message: t("address") })
      .max(200, { message: t("maxAddress") }),
    comment: z
      .string()
      .max(500, { message: t("maxComment") })
      .optional(),
  })
}
