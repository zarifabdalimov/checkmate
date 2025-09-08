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

import { useConfirmSignUp } from "@/hooks/use-confirm-sign-up";
import { useResendVerificationCode } from "@/hooks/use-resend-verification-code";
import { getAuthErrorMessage } from "@/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createVerificationSchema = (t: (key: string) => string) =>
  z.object({
    code: z.string().min(1, t("codeRequired")).length(6, t("codeLength")),
  });

type VerificationFormData = z.infer<
  ReturnType<typeof createVerificationSchema>
>;

export function VerifyEmailScreen() {
  const t = useTranslations("AuthPages.verifyEmail");
  const tValidation = useTranslations("AuthPages.validation");
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const confirmSignUpMutation = useConfirmSignUp();
  const resendCodeMutation = useResendVerificationCode();

  const form = useForm<VerificationFormData>({
    resolver: zodResolver(createVerificationSchema(tValidation)),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: VerificationFormData) => {
    if (!email) {
      return;
    }

    confirmSignUpMutation.mutate(
      {
        username: email,
        confirmationCode: data.code,
      },
      {
        onSuccess: () => {
          router.push("/auth/sign-in?message=verified");
          setSuccessMessage(t("messages.success"));
          setTimeout(() => {
            router.push("/auth/sign-in?message=verified");
          }, 2000);
        },
      },
    );
  };

  const handleResendCode = async () => {
    if (!email) {
      return;
    }

    resendCodeMutation.mutate(email, {
      onSuccess: () => {
        setSuccessMessage(t("messages.resendSuccess"));
        setTimeout(() => setSuccessMessage(null), 5000);
      },
    });
  };

  useEffect(() => {
    if (!email) {
      router.push("/auth/sign-up");
    }
  }, [email, router]);

  if (!email) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <p className="text-muted-foreground">
            {t("subtitle")} <strong>{email}</strong>
          </p>
        </div>

        {successMessage && (
          <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
            {successMessage}
          </div>
        )}

        {(confirmSignUpMutation.error || resendCodeMutation.error) && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {getAuthErrorMessage(
              confirmSignUpMutation.error || resendCodeMutation.error,
            )}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.code")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t("form.codePlaceholder")}
                      className="text-center text-lg tracking-widest"
                      maxLength={6}
                      disabled={confirmSignUpMutation.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={confirmSignUpMutation.isPending}
            >
              {confirmSignUpMutation.isPending
                ? t("form.submittingButton")
                : t("form.submitButton")}
            </Button>
          </form>
        </Form>

        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">{t("resend.text")}</p>
          <Button
            variant="outline"
            onClick={handleResendCode}
            disabled={resendCodeMutation.isPending}
            className="w-full"
          >
            {resendCodeMutation.isPending
              ? t("resend.sendingButton")
              : t("resend.button")}
          </Button>
        </div>

        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => router.push("/auth/sign-up")}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("footer.backToSignUp")}
          </Button>
        </div>
      </Card>
    </div>
  );
}
