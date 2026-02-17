import { create } from "zustand";
import { api } from "@/lib/api";
import {
  ProjectState,
  Screen,
  GenerateProjectUIData,
} from "@/types/projectTypes";

export const useProjectStore = create<ProjectState>((set, get) => ({
  projectId: null,
  projectInput: null, // ✅ ADD THIS
  screens: [],
  activeScreenId: null,

  isGenerating: false,
  isEditing: false,
  error: null,

  // ---------------------------
  // BASIC SETTERS
  // ---------------------------
  setProjectInput: (data) => set({ projectInput: data }),

  setProject: (id: string) => set({ projectId: id }),

  setScreens: (screens: Screen[]) =>
    set({
      screens,
      activeScreenId: screens[0]?.id ?? null,
    }),

  setActiveScreen: (id: string) => set({ activeScreenId: id }),

  updateScreenHtml: (screenId: string, html: string) =>
    set((state) => ({
      screens: state.screens.map((screen) =>
        screen.id === screenId ? { ...screen, htmlCode: html } : screen,
      ),
    })),

  reset: () =>
    set({
      projectId: null,
      projectInput: null,
      screens: [],
      activeScreenId: null,
      error: null,
      isGenerating: false,
      isEditing: false,
    }),

  // ---------------------------
  // GENERATE PROJECT UI
  // ---------------------------

  generateProjectUI: async (data: GenerateProjectUIData) => {
    const { projectId } = get();
    if (!projectId) return;

    set({ isGenerating: true, error: null });

    try {
      await api.post(
        `/api/ai-generations/generate-project-ui/${projectId}`,
        data,
      );

      const screensRes = await api.get<Screen[]>(
        `/api/screen/get-all-screen/${projectId}`,
      );

      set({
        screens: screensRes.data,
        activeScreenId: screensRes.data[0]?.id ?? null,
      });
    } catch (err: any) {
      set({ error: err?.response?.data?.error || "Generation failed" });
    } finally {
      set({ isGenerating: false });
    }
  },

  // ---------------------------
  // AI EDIT SCREEN
  // ---------------------------

  editScreen: async (screenId: string, prompt: string) => {
    set({ isEditing: true, error: null });

    try {
      const res = await api.post<{ updatedHtml: string }>(
        `/api/ai-generations/edit-screen`,
        { screenId, prompt },
      );

      get().updateScreenHtml(screenId, res.data.updatedHtml);
    } catch (err: any) {
      set({ error: err?.response?.data?.error || "Edit failed" });
    } finally {
      set({ isEditing: false });
    }
  },

  // ---------------------------
  // CREATE PROJECT
  // ---------------------------

  makeProject: async (form: {
    name: string;
    description: string;
    theme: string;
  }) => {
    set({ error: null });

    try {
      const res = await api.post("/api/projects/makeProjects", form);
      const project = res.data;

      set({
        projectId: project.id,
      });

      return project;
    } catch (err: any) {
      const message =
        err?.response?.data?.error || err?.message || "Project creation failed";

      set({ error: message });
      throw new Error(message);
    }
  },
}));
