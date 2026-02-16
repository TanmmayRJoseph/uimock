"use client";

import { Loader2 } from "lucide-react";
import { useProjectStore } from "@/store/projectStore";

export default function LoadingOverlay() {
  const { isGenerating, isEditing } = useProjectStore();

  if (!isGenerating && !isEditing) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-xl shadow-lg">
        <Loader2 className="animate-spin h-5 w-5" />
        <span className="text-sm font-medium">
          {isGenerating ? "Generating UI..." : "Editing Screen..."}
        </span>
      </div>
    </div>
  );
}
