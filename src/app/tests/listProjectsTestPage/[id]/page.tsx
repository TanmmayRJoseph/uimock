"use client";

import { useEffect, useState } from "react";

interface Project {
  id: string;
  name: string;
  theme: string;
  description: string;
  userId: string;
  createdAt: string;
}

export default function ProjectTestPage({
  params,
}: {
  params: { id: string };
}) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(
          `/api/projects/fetchProjectsOfUser/${params.id}`,
        );

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to fetch project");
        }

        const data = await res.json();
        setProject(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params.id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!project) return <p>No project found</p>;

  return (
    <div style={{ padding: 24 }}>
      <h2>Project Test Page</h2>
      <pre style={{ marginTop: 16 }}>{JSON.stringify(project, null, 2)}</pre>
    </div>
  );
}
