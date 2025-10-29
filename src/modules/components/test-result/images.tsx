import { Card, CardContent, CardHeader, CardTitle } from "@/modules/ui/card";
import { TestImageViewer } from "@/modules/tests/screens/test-result-detail-screen/parts/test-image-viewer";

interface TestResultImagesProps {
  originalFileUrl?: string;
  evaluatedFileUrl?: string;
  title: string;
  originalLabel: string;
  evaluatedLabel: string;
  viewFullscreenLabel: string;
  closeFullscreenLabel: string;
}

export function TestResultImages({
  originalFileUrl,
  evaluatedFileUrl,
  title,
  originalLabel,
  evaluatedLabel,
  viewFullscreenLabel,
  closeFullscreenLabel,
}: TestResultImagesProps) {
  if (!originalFileUrl && !evaluatedFileUrl) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {originalFileUrl && (
            <TestImageViewer
              imageUrl={originalFileUrl}
              title={originalLabel}
              viewFullscreenLabel={viewFullscreenLabel}
              closeFullscreenLabel={closeFullscreenLabel}
            />
          )}
          {evaluatedFileUrl && (
            <TestImageViewer
              imageUrl={evaluatedFileUrl}
              title={evaluatedLabel}
              viewFullscreenLabel={viewFullscreenLabel}
              closeFullscreenLabel={closeFullscreenLabel}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
