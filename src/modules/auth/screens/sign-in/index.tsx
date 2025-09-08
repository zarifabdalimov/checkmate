"use client";

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
import { useSignIn } from "@/hooks/use-sign-in";
import { getAuthErrorMessage } from "@/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useBoolean } from "usehooks-ts";

import { createSignInSchema, type SignInFormData } from "../../lib/validation";

export function SignInScreen() {
  const t = useTranslations("AuthPages.signIn");
  const tValidation = useTranslations("AuthPages.validation");
  const showPassword = useBoolean();
  const router = useRouter();

  const signInMutation = useSignIn();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(createSignInSchema(tValidation)),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    signInMutation.mutate(
      {
        username: data.email,
        password: data.password,
      },
      {
        onSuccess: (data, variables) => {
          if (data.isSignedIn) {
            router.push("/dashboard");
          } else if (data.nextStep?.signInStep === "CONFIRM_SIGN_UP") {
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
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>

        {/* Error Message */}
        {signInMutation.error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {getAuthErrorMessage(signInMutation.error)}
          </div>
        )}

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
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
                        disabled={signInMutation.isPending}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
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
                        disabled={signInMutation.isPending}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={showPassword.toggle}
                        disabled={signInMutation.isPending}
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

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={signInMutation.isPending}
            >
              {signInMutation.isPending
                ? t("form.submittingButton")
                : t("form.submitButton")}
            </Button>
          </form>
        </Form>

        {/* Footer */}
        <div className="text-center space-y-4">
          <div className="text-sm text-muted-foreground">
            {t("footer.noAccount")}{" "}
            <Link
              href="/auth/sign-up"
              className="text-primary hover:underline font-medium"
            >
              {t("footer.signUpLink")}
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
