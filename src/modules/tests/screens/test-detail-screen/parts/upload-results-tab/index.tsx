"use client";
import { Test } from "@/lib/api/generated/model";
import { Button } from "@/modules/ui/button";
import {
  Dropzone,
  DropZoneArea,
  DropzoneDescription,
  DropzoneFileList,
  DropzoneFileListItem,
  DropzoneMessage,
  DropzoneRemoveFile,
  DropzoneTrigger,
  useDropzone,
} from "@/modules/ui/dropzone";
import { CloudUploadIcon, Trash2Icon, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useUploadResults } from "./hooks/use-upload-results";

interface UploadResultsTabProps {
  test: Test;
}

export function UploadResultsTab({ test }: UploadResultsTabProps) {
  const { getUploadStatus, uploadMutation } = useUploadResults();
  const t = useTranslations("Dashboard.tests.uploadResults");

  const dropzone = useDropzone({
    onDropFile: async (file: File) => {
      // For now, just return success with local URL
      // The actual upload will happen when user clicks Upload button
      await new Promise((resolve) => setTimeout(resolve, 100));
      return {
        status: "success",
        result: URL.createObjectURL(file),
      };
    },
    validation: {
      accept: {
        "image/*": [".png", ".jpg", ".jpeg"],
      },
      maxSize: 10 * 1024 * 1024,
      maxFiles: 10,
    },
  });

  async function handleUpload() {
    if (dropzone.fileStatuses.length === 0) {
      return;
    }

    uploadMutation.mutate({
      testId: test.id,
      files: dropzone.fileStatuses.map((fileStatus) => fileStatus.file),
    });
  }

  return (
    <div className="not-prose flex flex-col gap-4">
      <Button
        onClick={handleUpload}
        disabled={
          uploadMutation.isPending || dropzone.fileStatuses.length === 0
        }
      >
        {uploadMutation.isPending ? (
          <>
            <Loader2Icon className="size-4 animate-spin mr-2" />
            {t("uploadButton.uploading")}
          </>
        ) : (
          <>
            <CloudUploadIcon className="size-4 mr-2" />
            {t("uploadButton.idle")}
          </>
        )}
      </Button>
      <Dropzone {...dropzone}>
        <div>
          <div className="flex justify-between">
            <DropzoneDescription>
              {t("dropzone.description")}
            </DropzoneDescription>
            <DropzoneMessage />
          </div>
          <DropZoneArea>
            <DropzoneTrigger className="flex flex-col items-center gap-4 bg-transparent p-10 text-center text-sm">
              <CloudUploadIcon className="size-8" />
              <div>
                <p className="font-semibold">{t("dropzone.trigger.title")}</p>
                <p className="text-sm text-muted-foreground">
                  {t("dropzone.trigger.subtitle")}
                </p>
              </div>
            </DropzoneTrigger>
          </DropZoneArea>
        </div>

        <DropzoneFileList className="grid grid-cols-3 gap-3 p-0">
          {dropzone.fileStatuses.map((file, index) => {
            // Generate the same ID format as the hook uses
            const uploadFileId = `file-${index}-${file.file.name}`;
            const uploadStatus = getUploadStatus(uploadFileId);
            return (
              <DropzoneFileListItem
                className="overflow-hidden rounded-md bg-secondary p-0 shadow-sm"
                key={file.id}
                file={file}
              >
                {file.status === "pending" && (
                  <div className="aspect-video animate-pulse bg-black/20" />
                )}
                {file.status === "success" && (
                  <div className="aspect-video relative">
                    <Image
                      src={file.result}
                      alt={`uploaded-${file.fileName}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between p-2 pl-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm">{file.fileName}</p>
                    <p className="text-xs text-muted-foreground">
                      {t("fileSize", {
                        size: (file.file.size / (1024 * 1024)).toFixed(2),
                      })}
                    </p>
                    {uploadStatus && (
                      <div className="flex items-center gap-1 mt-1">
                        {uploadStatus.status === "uploading" && (
                          <>
                            <Loader2Icon className="size-3 animate-spin" />
                            <span className="text-xs text-blue-600">
                              {t("fileStatus.uploading")}
                            </span>
                          </>
                        )}
                        {uploadStatus.status === "completed" && (
                          <>
                            <CloudUploadIcon className="size-3 text-green-600" />
                            <span className="text-xs text-green-600">
                              {t("fileStatus.uploaded")}
                            </span>
                          </>
                        )}
                        {uploadStatus.status === "error" && (
                          <>
                            <span className="text-xs text-red-600">
                              {t("fileStatus.failed")}
                            </span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <DropzoneRemoveFile
                    variant="ghost"
                    className="shrink-0 hover:outline"
                    disabled={uploadMutation.isPending}
                  >
                    <Trash2Icon className="size-4" />
                  </DropzoneRemoveFile>
                </div>
              </DropzoneFileListItem>
            );
          })}
        </DropzoneFileList>
      </Dropzone>
    </div>
  );
}
