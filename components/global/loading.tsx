import { Loader2 } from "lucide-react";

export default function LoadingWithFullShade() {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
      <div className="flex items-center space-x-2 text-foreground">
        <Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" />
        <span className="text-lg font-medium">Loading...</span>
      </div>
    </div>
  );
}

export function LoadingWithText() {
    return (
        <div className="flex items-center space-x-2">
        <Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" />
        <span className="text-lg font-medium">Loading...</span>
      </div>
    );
  }

export function LoadingIcon() {
    return (
        <Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" />
    );
  }
