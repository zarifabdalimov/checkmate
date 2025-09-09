import { Spinner } from "../../ui/spinner";
import { Button } from "@/modules/ui/button";
import { Plus } from "lucide-react";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import * as React from "react";

interface EmptyStateProps {
  icon?: IconName;
  title?: string;
  description?: string;
  isLoading?: boolean;
  cta?: {
    label: string;
    onClick: () => void;
  };
}

export function Status({
  icon,
  title,
  isLoading,
  description,
  cta,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="rounded-full bg-muted p-6">
          {isLoading && <Spinner variant="ellipsis" />}
          {icon && (
            <DynamicIcon
              name={icon}
              className="h-12 w-12 text-muted-foreground"
            />
          )}
        </div>
        {!isLoading && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-muted-foreground max-w-sm">{description}</p>
          </div>
        )}
        {cta && (
          <Button onClick={cta.onClick} className="gap-2 mt-4">
            <Plus className="h-4 w-4" />
            {cta.label}
          </Button>
        )}
      </div>
    </div>
  );
}
