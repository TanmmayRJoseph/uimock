"use client";

import { useState } from "react";
import { useProjectStore } from "@/store/projectStore";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function CodePanel() {
  const {
    screens,
    activeScreenId,
    editScreen,
    updateScreenHtml,
  } = useProjectStore();

  const [editPrompt, setEditPrompt] = useState("");

  const activeScreen = screens.find(
    (s) => s.id === activeScreenId
  );

  if (!activeScreen) return null;

  return (
    <div className="w-96 border-l bg-background h-screen flex flex-col">
      <div className="p-4 border-b font-semibold">
        Source Code
      </div>

      <div className="flex-1 p-4 overflow-auto">
        <Textarea
          value={activeScreen.htmlCode}
          onChange={(e) =>
            updateScreenHtml(activeScreen.id, e.target.value)
          }
          className="min-h-[400px] font-mono text-sm"
        />
      </div>

      <div className="p-4 border-t space-y-2">
        <Textarea
          placeholder="Edit with AI... e.g. Make buttons rounded and modern"
          value={editPrompt}
          onChange={(e) => setEditPrompt(e.target.value)}
        />

        <Button
          className="w-full"
          onClick={() => {
            if (!editPrompt.trim()) return;
            editScreen(activeScreen.id, editPrompt);
            setEditPrompt("");
          }}
        >
          AI Edit Screen
        </Button>
      </div>
    </div>
  );
}
