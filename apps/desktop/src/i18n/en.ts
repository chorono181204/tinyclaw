export const en = {
  shell: {
    search: "Search workspace",
    workspace: "Workspace",
    projectName: "Ducky desktop",
    menu: "Toggle sidebar",
    hero: {
      title: "A cleaner desktop shell for Ducky",
      summary:
        "The layout now focuses on reusable structure instead of demo-only code, with a real header, collapsible sidebar, language choice, theme selection, dropdown menus, and modal foundations."
    },
    actions: {
      newTask: "New task",
      runCheck: "Run check"
    },
    sections: {
      chat: "Chat",
      control: "Control",
      agent: "Agent",
      settings: "Settings"
    },
    nav: {
      chat: "Chat",
      overview: "Overview",
      channels: "Channels",
      instances: "Instances",
      sessions: "Sessions",
      usage: "Usage",
      cronJobs: "Cron jobs",
      agents: "Agents",
      skills: "Skills",
      nodes: "Nodes",
      config: "Config",
      communications: "Communications",
      docs: "Docs"
    },
    panel: {
      title: "Project shell",
      description:
        "Header and sidebar now define the main desktop structure, while the content area stays focused on reusable product blocks.",
      stats: {
        ready: "Ready for app shell",
        i18n: "i18n wired",
        theme: "Theme tokens active"
      }
    },
    cards: {
      layout: {
        title: "Layout primitives",
        body:
          "Header, sidebar, and content are now separated into reusable shell components instead of one large demo file."
      },
      language: {
        title: "Language selection",
        body:
          "Language can be changed from the sidebar or header dropdown, and the choice is saved locally."
      },
      theme: {
        title: "Theme selection",
        body:
          "Light, dark, and system modes now share the same semantic tokens and can be changed from the header."
      }
    }
  },
  modal: {
    newTask: {
      title: "Create a new task",
      description:
        "This modal is the first reusable dialog foundation for upcoming task flows.",
      cancel: "Cancel",
      confirm: "Create task",
      fields: {
        goal: "Goal",
        risk: "Risk"
      },
      placeholders: {
        goal: "Describe the task objective",
        risk: "Record the main risk before starting"
      }
    }
  },
  theme: {
    brand: "Ducky",
    sections: {
      ui: "Interface samples"
    },
    locale: {
      label: "Language",
      en: "English",
      vi: "Vietnamese"
    },
    mode: {
      label: "Theme",
      light: "Light",
      dark: "Dark",
      system: "System"
    },
    ui: {
      primaryButton: "Primary action",
      secondaryButton: "Secondary action",
      ghostButton: "Quiet action",
      inputLabel: "Input field",
      inputValue: "Type here",
      panelTitle: "Workspace panel",
      panelBody:
        "Readable surfaces and soft borders should feel stable, not flashy."
    }
  }
} as const;
