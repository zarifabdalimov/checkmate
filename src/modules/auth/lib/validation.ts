import { z } from "zod"

type TranslationFunction = (key: string) => string

export const createSignInSchema = (t: TranslationFunction) =>
  z.object({
    email: z
      .string()
      .min(1, t("emailRequired"))
      .email(t("emailInvalid")),
    password: z
      .string()
      .min(1, t("passwordRequired"))
      .min(6, t("passwordMinLength")),
  })

export const createSignUpSchema = (t: TranslationFunction) =>
  z.object({
    email: z
      .string()
      .min(1, t("emailRequired"))
      .email(t("emailInvalid")),
    password: z
      .string()
      .min(1, t("passwordRequired"))
      .min(6, t("passwordMinLength")),
    confirmPassword: z
      .string()
      .min(1, t("confirmPasswordRequired")),
  }).refine((data) => data.password === data.confirmPassword, {
    message: t("passwordsDontMatch"),
    path: ["confirmPassword"],
  })

// For backward compatibility and type inference
export const signInSchema = createSignInSchema(() => "")
export const signUpSchema = createSignUpSchema(() => "")

export type SignInFormData = z.infer<typeof signInSchema>
export type SignUpFormData = z.infer<typeof signUpSchema>
