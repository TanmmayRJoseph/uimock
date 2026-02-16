"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useProjectStore } from "@/store/projectStore";

interface Props {
  open: boolean;
  theme: string;
}

export default function GenerateUIAfterCreate({ open, theme }: Props) {
  const router = useRouter();
  const { generateProjectUI, isGenerating, projectId } = useProjectStore();

  const [appType, setAppType] = useState("");
  const [screensInput, setScreensInput] = useState("");
  const [style, setStyle] = useState("");
  const [device, setDevice] = useState("mobile");

  const handleGenerate = async () => {
    if (!projectId) return;

    const screens = screensInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (!appType || screens.length === 0 || !style || !device) {
      return alert("Please fill all fields");
    }

    try {
      await generateProjectUI({
        appType,
        screens,
        theme,
        style,
        device,
      });

      router.push(`/project/${projectId}`);
    } catch (err) {
      console.error("Generation failed:", err);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-md">
        <DialogHeader>
          <DialogTitle>Configure AI Generation</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Provide details to generate your app UI.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <Label>App Type</Label>
            <Input
              value={appType}
              onChange={(e) => setAppType(e.target.value)}
              placeholder="Food Delivery App"
              className="bg-zinc-800 border-zinc-700"
            />
          </div>

          <div>
            <Label>Screens (comma separated)</Label>
            <Textarea
              value={screensInput}
              onChange={(e) => setScreensInput(e.target.value)}
              placeholder="Login, Home, Cart, Profile"
              className="bg-zinc-800 border-zinc-700"
            />
          </div>

          <div>
            <Label>Style</Label>
            <Input
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              placeholder="modern minimal"
              className="bg-zinc-800 border-zinc-700"
            />
          </div>

          <div>
            <Label>Device</Label>
            <Input
              value={device}
              onChange={(e) => setDevice(e.target.value)}
              placeholder="mobile"
              className="bg-zinc-800 border-zinc-700"
            />
          </div>

          {!isGenerating ? (
            <Button
              onClick={handleGenerate}
              className="w-full bg-white text-black"
            >
              <Sparkles size={16} />
              Generate UI
            </Button>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
              <p className="text-zinc-400 text-sm text-center">
                Generating UI...
              </p>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
