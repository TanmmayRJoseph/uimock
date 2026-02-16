"use client";

import { useProjectStore } from "@/store/projectStore";
import { useMemo } from "react";

export default function CanvasPreview() {
  const { screens, activeScreenId } = useProjectStore();

  const activeScreen = useMemo(
    () => screens.find((s) => s.id === activeScreenId),
    [screens, activeScreenId]
  );

  if (!activeScreen) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        No screen selected
      </div>
    );
  }

  const htmlContent = `
    <html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-gray-100">
        ${activeScreen.htmlCode}
      </body>
    </html>
  `;

  return (
    <div className="flex-1 bg-gray-200 p-6 overflow-auto">
      <div className="mx-auto bg-white shadow-lg rounded-xl overflow-hidden w-[375px] h-[800px]">
        <iframe
          srcDoc={htmlContent}
          className="w-full h-full"
          sandbox="allow-scripts"
        />
      </div>
    </div>
  );
}
