import { create } from "zustand";
import { api } from "@/lib/api";
import {
  ProjectState,
  Screen,
  GenerateProjectUIData,
} from "@/types/projectTypes";

export const useProjectStore = create<ProjectState>((set, get) => ({
  projectId: null,
  screens: [],
  activeScreenId: null,

  isGenerating: false,
  isEditing: false,
  error: null,

  // ---------------------------
  // BASIC SETTERS
  // ---------------------------

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
        screen.id === screenId
          ? { ...screen, htmlCode: html }
          : screen
      ),
    })),

  reset: () =>
    set({
      projectId: null,
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
        data
      );


      // Fetch real DB screens after generation
      const screensRes = await api.get<Screen[]>(
        `/api/screen/get-all-screen/${projectId}`
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
        { screenId, prompt }
      );

      const updatedHtml = res.data.updatedHtml;

      get().updateScreenHtml(screenId, updatedHtml);

    } catch (err: any) {
      set({ error: err?.response?.data?.error || "Edit failed" });
    } finally {
      set({ isEditing: false });
    }
  },
}));
