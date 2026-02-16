"use client";

import { useProjectStore } from "@/store/projectStore";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";

export default function Sidebar() {
  const {
    screens,
    activeScreenId,
    setActiveScreen,
  } = useProjectStore();

  return (
    <div className="w-64 border-r bg-muted/40 h-screen flex flex-col">
      <div className="p-4 border-b font-semibold text-lg">
        Screens
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {screens.map((screen) => (
            <Button
              key={screen.id}
              variant={activeScreenId === screen.id ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveScreen(screen.id)}
            >
              {screen.name}
            </Button>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <Button className="w-full gap-2">
          <Plus size={16} />
          Generate UI
        </Button>
      </div>
    </div>
  );
}
