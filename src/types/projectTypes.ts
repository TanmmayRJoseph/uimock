export interface Screen {
  id: string;
  name: string;
  htmlCode: string;
  order: string;
}

export interface GenerateProjectUIData {
  appType: string;
  screens: string[];
  theme: string;
  style: string;
  device: string;
}

export interface ProjectState {
  projectId: string | null;
  screens: Screen[];
  activeScreenId: string | null;

  isGenerating: boolean;
  isEditing: boolean;
  error: string | null;

  // Actions
  setProject: (id: string) => void;
  setScreens: (screens: Screen[]) => void;
  setActiveScreen: (id: string) => void;

  generateProjectUI: (data: GenerateProjectUIData) => Promise<void>;
  editScreen: (screenId: string, prompt: string) => Promise<void>;

  updateScreenHtml: (screenId: string, html: string) => void;
  reset: () => void;
}
