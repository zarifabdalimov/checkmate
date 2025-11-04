"use client";

import { useSignUp } from "@/hooks/use-sign-up";
import { Link } from "@/i18n/navigation";
import { getAuthErrorMessage } from "@/lib/auth";
import { Button } from "@/modules/ui/button";
import { Card } from "@/modules/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/modules/ui/form";
import { Input } from "@/modules/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail, UserPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useBoolean } from "usehooks-ts";

import { createSignUpSchema, type SignUpFormData } from "../../lib/validation";

export function SignUpScreen() {
  const t = useTranslations("AuthPages.signUp");
  const tValidation = useTranslations("AuthPages.validation");
  const showPassword = useBoolean();
  const showConfirmPassword = useBoolean();
  const router = useRouter();

  const signUpMutation = useSignUp();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(createSignUpSchema(tValidation)),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    signUpMutation.mutate(
      {
        username: data.email,
        password: data.password,
        options: {
          userAttributes: {
            email: data.email,
          },
        },
      },
      {
        onSuccess: (data, variables) => {
          if (data.isSignUpComplete) {
            router.push("/auth/sign-in");
          } else if (data.nextStep?.signUpStep === "CONFIRM_SIGN_UP") {
            const email = variables.username;
            router.push(
              `/auth/verify-email?email=${encodeURIComponent(email)}`,
            );
          }
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>

        {signUpMutation.error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {getAuthErrorMessage(signUpMutation.error)}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.email")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...field}
                        type="email"
                        placeholder={t("form.emailPlaceholder")}
                        className="pl-10"
                        disabled={signUpMutation.isPending}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.password")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...field}
                        type={showPassword.value ? "text" : "password"}
                        placeholder={t("form.passwordPlaceholder")}
                        className="pl-10 pr-10"
                        disabled={signUpMutation.isPending}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={showPassword.toggle}
                        disabled={signUpMutation.isPending}
                      >
                        {showPassword.value ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.confirmPassword")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...field}
                        type={showConfirmPassword.value ? "text" : "password"}
                        placeholder={t("form.confirmPasswordPlaceholder")}
                        className="pl-10 pr-10"
                        disabled={signUpMutation.isPending}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={showConfirmPassword.toggle}
                        disabled={signUpMutation.isPending}
                      >
                        {showConfirmPassword.value ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={signUpMutation.isPending}
            >
              {signUpMutation.isPending
                ? t("form.submittingButton")
                : t("form.submitButton")}
            </Button>
          </form>
        </Form>

        <div className="text-center space-y-4">
          <div className="text-sm text-muted-foreground">
            {t("footer.hasAccount")}{" "}
            <Link
              href="/auth/sign-in"
              className="text-primary hover:underline font-medium"
            >
              {t("footer.signInLink")}
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
