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
      <DialogContent className="bg-[#111827]/90 backdrop-blur-xl border border-[#1F2937] text-white max-w-md rounded-2xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Configure AI Generation
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Provide details to generate your app UI.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label className="text-gray-400">App Type</Label>
            <Input
              value={appType}
              onChange={(e) => setAppType(e.target.value)}
              placeholder="Food Delivery App"
              className="bg-[#1F2937] border-[#2A3441] text-white focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-400">Screens (comma separated)</Label>
            <Textarea
              value={screensInput}
              onChange={(e) => setScreensInput(e.target.value)}
              placeholder="Login, Home, Cart, Profile"
              className="bg-[#1F2937] border-[#2A3441] text-white focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-400">Style</Label>
            <Input
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              placeholder="Modern minimal"
              className="bg-[#1F2937] border-[#2A3441] text-white focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-400">Device</Label>
            <Input
              value={device}
              onChange={(e) => setDevice(e.target.value)}
              placeholder="Mobile"
              className="bg-[#1F2937] border-[#2A3441] text-white focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>

          {!isGenerating ? (
            <Button
              onClick={handleGenerate}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Sparkles size={16} />
              Generate UI
            </Button>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-4 py-4"
            >
              <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-400 text-sm text-center">
                Generating UI...
              </p>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
