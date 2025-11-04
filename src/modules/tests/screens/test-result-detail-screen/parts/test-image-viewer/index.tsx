"use client";

import { Button } from "@/modules/ui/button";
import { Dialog, DialogContent } from "@/modules/ui/dialog";
import { Maximize2Icon } from "lucide-react";
import { useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

interface TestImageViewerProps {
  imageUrl: string;
  title: string;
  viewFullscreenLabel: string;
  closeFullscreenLabel: string;
}

export function TestImageViewer({ imageUrl, title }: TestImageViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="relative">
      <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-lg border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-contain"
        />
        <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setIsFullscreen(true)}
          >
            <Maximize2Icon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-[90vw] p-0">
          <div className="relative h-[90vh]">
            <TransformWrapper>
              <TransformComponent>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt={title}
                  className="h-full w-full object-contain"
                />
              </TransformComponent>
            </TransformWrapper>
            <div className="absolute left-4 top-4 text-lg font-semibold text-foreground">
              {title}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
