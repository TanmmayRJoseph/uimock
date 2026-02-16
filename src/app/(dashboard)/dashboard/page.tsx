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

  // Optional: prevent flicker while session loads
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Skeleton className="h-10 w-40 bg-zinc-800" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-900/40 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Your Projects
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Manage and build your AI-generated UI projects
            </p>
          </div>

          <Button
            onClick={() => router.push("/make-project")}
            className="gap-2 bg-white text-black hover:bg-zinc-200"
          >
            <Plus size={16} />
            Create Project
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Loading */}
        {loading && (
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-2xl bg-zinc-800" />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <Folder size={48} className="text-zinc-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              No projects yet
            </h2>
            <p className="text-zinc-500 mb-6">
              Create your first project and start generating UI instantly.
            </p>
            <Button
              onClick={() => router.push("/make-project")}
              className="bg-white text-black hover:bg-zinc-200"
            >
              Create Project
            </Button>
          </motion.div>
        )}

        {/* Projects */}
        {!loading && projects.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card
                  onClick={() => router.push(`/project/${p.id}`)}
                  className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 cursor-pointer rounded-2xl transition-all"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                        {p.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          {p.name}
                        </h3>
                        <p className="text-xs text-zinc-500">
                          {p.theme || "Default Theme"}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-zinc-400 line-clamp-2">
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
