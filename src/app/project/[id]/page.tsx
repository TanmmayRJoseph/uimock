"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useProjectStore } from "@/store/projectStore";
import { api } from "@/lib/api";

import Sidebar from "@/components/Sidebar";
import CanvasPreview from "@/components/CanvasPreview";
import CodePanel from "@/components/CodePanel";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function ProjectPage() {
  const params = useParams();
  const projectId = params.id as string;

  const { setProject, setScreens } = useProjectStore();

  useEffect(() => {
    if (!projectId) return;

    setProject(projectId);

    async function loadScreens() {
      const res = await api.get(`/api/screen/get-all-screen/${projectId}`);
      setScreens(res.data);
    }

    loadScreens();
  }, [projectId]);

  return (
    <div className="flex h-screen relative">
      <Sidebar />

      <div className="flex flex-1">
        <CanvasPreview />
        <CodePanel />
      </div>

      <LoadingOverlay />
    </div>
  );
}
