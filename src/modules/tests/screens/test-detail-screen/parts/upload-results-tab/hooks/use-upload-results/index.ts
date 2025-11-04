import { usePostApiV1TestsTestIdResultsBulk } from "@/lib/api/generated/aPIForCheckmateApp";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

export type UploadStatus = "idle" | "uploading" | "completed" | "error";

export interface FileUploadProgress {
  id: string;
  status: UploadStatus;
  error?: string;
}

export interface UploadResultsParams {
  testId: string;
  files: File[];
}

export function useUploadResults() {
  const generateUploadUrl = usePostApiV1TestsTestIdResultsBulk();
  const [uploadProgress, setUploadProgress] = useState<FileUploadProgress[]>(
    [],
  );
  const t = useTranslations("Dashboard.tests.uploadResults.messages");

  const uploadMutation = useMutation({
    mutationFn: async ({ testId, files }: UploadResultsParams) => {
      if (files.length === 0) {
        throw new Error("No files to upload");
      }

      // Initialize upload progress for all files
      const initialProgress = files.map((file, index) => ({
        id: `file-${index}-${file.name}`,
        status: "uploading" as UploadStatus,
      }));
      setUploadProgress(initialProgress);

      // Get upload URLs from backend
      const response = await generateUploadUrl.mutateAsync({
        testId,
        data: {
          number_of_files: files.length,
        },
      });

      console.log("[debug] Upload URLs received:", response);

      if (
        !response.upload_urls ||
        response.upload_urls.length !== files.length
      ) {
        throw new Error("Invalid upload URLs received from server");
      }

      // Upload each file to its corresponding URL
      const uploadPromises = files.map(async (file, index) => {
        try {
          const uploadUrl = response.upload_urls![index];
          if (!uploadUrl) {
            throw new Error(`No upload URL provided for file ${file.name}`);
          }

          console.log(`Uploading ${file.name} to ${uploadUrl}`);

          // Upload file using fetch to pre-signed URL
          const uploadResponse = await fetch(uploadUrl, {
            method: "PUT",
            body: file,
            headers: {
              "Content-Type": file.type,
            },
          });

          if (!uploadResponse.ok) {
            throw new Error(
              `Upload failed with status ${uploadResponse.status}`,
            );
          }

          console.log(`Successfully uploaded ${file.name}`);

          // Update progress for this file
          setUploadProgress((prev) =>
            prev.map((p) =>
              p.id === `file-${index}-${file.name}`
                ? { ...p, status: "completed" as UploadStatus }
                : p,
            ),
          );
        } catch (error) {
          console.error(`Failed to upload ${file.name}:`, error);

          // Update progress for this file with error
          setUploadProgress((prev) =>
            prev.map((p) =>
              p.id === `file-${index}-${file.name}`
                ? {
                    ...p,
                    status: "error" as UploadStatus,
                    error:
                      error instanceof Error ? error.message : "Upload failed",
                  }
                : p,
            ),
          );

          throw error; // Re-throw to trigger React Query error handling
        }
      });

      await Promise.all(uploadPromises);
      console.log("All uploads completed successfully");

      return { success: true };
    },
    onSuccess: () => {
      toast.success(t("uploadSuccess"));
    },
    onError: () => {
      toast.error(t("uploadError"));
    },
  });

  // Helper function to get upload status for a file
  const getUploadStatus = (fileId: string) => {
    return uploadProgress.find((p) => p.id === fileId);
  };

  return {
    uploadMutation,
    uploadProgress,
    getUploadStatus,
  };
}
