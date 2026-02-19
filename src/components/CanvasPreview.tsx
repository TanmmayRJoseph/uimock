"use client";

import { useProjectStore } from "@/store/projectStore";
import { useMemo } from "react";

export default function CanvasPreview() {
  const { screens, activeScreenId } = useProjectStore();

  const activeScreen = useMemo(
    () => screens.find((s) => s.id === activeScreenId),
    [screens, activeScreenId],
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
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
      body {
        font-family: ui-sans-serif, system-ui, -apple-system;
      }
        @keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.4s ease-in-out;
}
    </style>
  </head>
  <body class="bg-gray-100 p-4">
    ${activeScreen.htmlCode}

    <script>
      lucide.createIcons();
    </script>
  </body>
</html>
`;

  return (
    <div className="flex-1 bg-gray-200 p-6 overflow-auto">
      <div className="mx-auto bg-white shadow-lg rounded-xl overflow-hidden w-[375px] h-[800px] animate-fadeIn">
        <iframe
          srcDoc={htmlContent}
          className="w-full h-full"
          sandbox="allow-scripts"
        />
      </div>
    </div>
  );
}
