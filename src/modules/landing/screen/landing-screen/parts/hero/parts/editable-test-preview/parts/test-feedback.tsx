"use client";

import { useState } from "react";
import { useBoolean } from "usehooks-ts";
import { useTranslations } from "next-intl";
import { ThumbsUp, ThumbsDown, Loader2 } from "lucide-react";
import { Button } from "@/modules/ui/button";
import { Textarea } from "@/modules/ui/textarea";
import { useSubmitDemoTestFeedback } from "@/hooks/use-create-demo-test";
import { toast } from "sonner";

interface TestFeedbackProps {
  testId: string;
  initialLiked?: boolean | null;
  initialComment?: string | null;
}

export function TestFeedback({ testId, initialLiked, initialComment }: TestFeedbackProps) {
  const t = useTranslations("ShowcasePage.feedback");
  const [liked, setLiked] = useState<boolean | null>(initialLiked ?? null);
  const [comment, setComment] = useState(initialComment ?? "");
  const { value: showComment, setTrue: openComment, setFalse: closeComment } = useBoolean(false);

  const { mutate: submitFeedback, isPending } = useSubmitDemoTestFeedback(testId);

  const handleFeedback = (isLiked: boolean) => {
    const newLiked = liked === isLiked ? null : isLiked;
    setLiked(newLiked);

    if (newLiked !== null) {
      openComment();
    } else {
      closeComment();
      setComment("");
    }
  };

  const handleSubmit = () => {
    if (liked === null) return;

    submitFeedback(
      { liked, comment: comment || undefined },
      {
        onSuccess: () => {
          toast.success(t("success"));
        },
        onError: () => {
          toast.error(t("error"));
        },
      }
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm text-muted-foreground">{t("title")}</p>
        <div className="flex gap-2">
          <Button
            variant={liked === true ? "default" : "outline"}
            size="sm"
            onClick={() => handleFeedback(true)}
            disabled={isPending}
            className="gap-2"
          >
            {isPending && liked === true ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ThumbsUp className="w-4 h-4" />
            )}
            {t("like")}
          </Button>
          <Button
            variant={liked === false ? "default" : "outline"}
            size="sm"
            onClick={() => handleFeedback(false)}
            disabled={isPending}
            className="gap-2"
          >
            {isPending && liked === false ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ThumbsDown className="w-4 h-4" />
            )}
            {t("dislike")}
          </Button>
        </div>
      </div>

      {showComment && liked !== null && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <Textarea
            placeholder={t("commentPlaceholder")}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[80px] resize-none"
          />
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {t("submitting")}
              </>
            ) : (
              t("submitFeedback")
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
