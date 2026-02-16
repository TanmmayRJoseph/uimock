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

  // 🔥 AI-only data (NOT stored in DB)
  projectInput: {
    appType: string;
    screenName: string;
    style: string;
    device: string;
  } | null;

  screens: Screen[];
  activeScreenId: string | null;

  isGenerating: boolean;
  isEditing: boolean;
  error: string | null;

  // Actions
  setProject: (id: string) => void;

  // 🔥 Add this
  setProjectInput: (data: {
    appType: string;
    screenName: string;
    style: string;
    device: string;
  }) => void;

  generateProjectUI: (data: GenerateProjectUIData) => Promise<void>;
  editScreen: (screenId: string, prompt: string) => Promise<void>;

  // 🔥 Only DB fields now
  makeProject: (form: {
    name: string;
    description: string;
    theme: string;
  }) => Promise<any>;

  updateScreenHtml: (screenId: string, html: string) => void;
  reset: () => void;
}

