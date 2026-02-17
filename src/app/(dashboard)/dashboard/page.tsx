"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Folder } from "lucide-react";

export default function DashboardPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") return;

    async function fetchProjects() {
      try {
        setLoading(true);

        const res = await api.get(
          `/api/projects/fetchProjectsOfUser/${session?.user?.id}`
        );

        setProjects(res.data ?? []);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [status, session?.user?.id]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#0B0C10] flex items-center justify-center">
        <Skeleton className="h-10 w-40 bg-white/10" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0B0C10] text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-purple-600/10 blur-[160px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Your{" "}
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Manage and build your AI-generated UI projects
            </p>
          </div>

          <Button
            onClick={() => router.push("/make-project")}
            className="gap-2 rounded-2xl px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-600/30"
          >
            <Plus size={16} />
            Create Project
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-6 py-12">

        {/* Loading State */}
        {loading && (
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Skeleton
                key={i}
                className="h-36 rounded-3xl bg-white/5 border border-white/10"
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-28 text-center"
          >
            <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-600/10 to-indigo-600/10 mb-6">
              <Folder size={48} className="text-purple-400" />
            </div>

            <h2 className="text-2xl font-semibold mb-3">
              No projects yet
            </h2>

            <p className="text-gray-400 mb-8 max-w-md">
              Create your first AI-powered UI project and start building faster.
            </p>

            <Button
              onClick={() => router.push("/make-project")}
              className="rounded-2xl px-8 bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-600/30"
            >
              Create Project
            </Button>
          </motion.div>
        )}

        {/* Projects Grid */}
        {!loading && projects.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 250 }}
              >
                <Card
                  onClick={() => router.push(`/project/${p.id}`)}
                  className="relative rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-purple-500/40 cursor-pointer transition-all duration-500 shadow-xl"
                >
                  <CardContent className="p-7">
                    <div className="flex items-center gap-4 mb-5">

                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {p.name?.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg tracking-tight">
                          {p.name}
                        </h3>
                        <p className="text-xs text-gray-400">
                          {p.theme || "Default Theme"}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                      {p.description || "No description provided."}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
