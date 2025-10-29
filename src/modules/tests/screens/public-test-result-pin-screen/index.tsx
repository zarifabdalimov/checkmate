"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/modules/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/modules/ui/input-otp";
import { useRouter } from "@/i18n/navigation";

// Hardcoded PIN for now
const HARDCODED_PIN = "123456";

interface PublicTestResultPinScreenProps {
  resultId: string;
}

export function PublicTestResultPinScreen({
  resultId,
}: PublicTestResultPinScreenProps) {
  const router = useRouter();
  const t = useTranslations("PublicResult.pin");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handlePinComplete = async (value: string) => {
    setPin(value);
    setIsVerifying(true);

    // Simulate API call to verify PIN and get one-time token
    // In real implementation, this would call: POST /api/results/{resultId}/verify-pin
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (value === HARDCODED_PIN) {
      // Generate a one-time token (in real app, this comes from the API)
      const oneTimeToken = `token_${Date.now()}_${Math.random().toString(36).substring(7)}`;

      // Redirect to the result page with the one-time token
      router.push(`/result/${resultId}/view/${oneTimeToken}`);
    } else {
      setError(t("invalidPin"));
      setPin("");
      setIsVerifying(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/10 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">{t("title")}</CardTitle>
          <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <InputOTP
              maxLength={6}
              value={pin}
              onChange={(value) => {
                setPin(value);
                setError("");
              }}
              onComplete={handlePinComplete}
              disabled={isVerifying}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            {isVerifying && (
              <p className="text-sm text-muted-foreground">{t("verifying")}</p>
            )}

            {error && (
              <p className="text-sm font-medium text-red-500">{error}</p>
            )}

            <div className="text-center text-sm text-muted-foreground">
              <p>
                {t("resultId")}: {resultId}
              </p>
              <p className="mt-2 text-xs">
                {t("testingNote")} <span className="font-mono">123456</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
