import { useTranslations } from "next-intl"
import { z } from "zod"

export function useAuthFormSchema() {
  const t = useTranslations("auth.validation")

  const passwordSchema = z.string().min(4, { message: t("password") })

  const formLoginSchema = z.object({
    email: z.string().email({ message: t("email") }),
    password: passwordSchema,
  })

  const formRegisterSchema = formLoginSchema
    .merge(
      z.object({
        fullName: z.string().min(2, { message: t("fullName") }),
        confirmPassword: passwordSchema,
      })
    )
    .refine((data) => data.password === data.confirmPassword, {
      message: t("passwordMatch"),
      path: ["confirmPassword"],
    })

  return {
    formLoginSchema,
    formRegisterSchema,
  }
}
