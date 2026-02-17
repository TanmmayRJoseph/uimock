"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProjectStore } from "@/store/projectStore";
import GenerateUIAfterCreate from "@/components/GenerateUIAfterCreate";

export default function CreateProjectForm() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    theme: "light",
  });

  const [loading, setLoading] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);

  const { makeProject } = useProjectStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const project = await makeProject(form);

      toast.success("Project created successfully 🚀");

      if (project?.id) {
        setShowGenerator(true);
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] px-4 relative overflow-hidden">
      {/* Background Gradient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#4f46e5_0%,_transparent_50%)] opacity-20" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg relative"
      >
        <Card className="bg-[#111827]/80 backdrop-blur-xl border border-[#1F2937] shadow-2xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold text-white tracking-tight">
              Create New Project
            </CardTitle>
            <p className="text-sm text-gray-400 mt-1">
              Start building your AI-generated UI experience.
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Project Name */}
              <div className="space-y-2">
                <Label className="text-gray-400">Project Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="bg-[#1F2937] border-[#2A3441] text-white focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label className="text-gray-400">Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="bg-[#1F2937] border-[#2A3441] text-white focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>

              {/* Theme Select */}
              <div className="space-y-2">
                <Label className="text-gray-400">Theme</Label>
                <Select
                  value={form.theme}
                  onValueChange={(value) => setForm({ ...form, theme: value })}
                >
                  <SelectTrigger className="bg-[#1F2937] border-[#2A3441] text-white focus:ring-2 focus:ring-indigo-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111827] border border-[#1F2937] text-white">
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* CTA */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-300"
              >
                {loading ? "Creating..." : "Create Project"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <GenerateUIAfterCreate open={showGenerator} theme={form.theme} />
      </motion.div>
    </div>
  );
}
