export const en = {
  chat: {
    session: {
      main: "main",
      workspace: "workspace",
      review: "review"
    },
    tools: {
      completed: "Completed",
      running: "Running",
      execLabel: "exec",
      readLabel: "read",
      execSummary: "1 tool exec",
      readSummary: "1 tool read",
      execDetail: "with list files in skills, `ls skills`",
      readDetail: "with from skills/trello/SKILL.md",
      envDetail:
        "with if [ -n \"$TRELLO_API_KEY\" ] && [ -n \"$TRELLO_TOKEN\" ]; then echo ready; else echo missing; fi"
    },
    mock: {
      userPrompt: "List all of my Trello boards",
      userLabel: "You",
      assistantName: "Assistant",
      assistantBody: {
        first:
          "Hi! To list your Trello boards, Ducky still needs a valid API key and token for the Trello skill.",
        second:
          "Right now those environment values are missing, so the tool run stopped before it could call the API.",
        third:
          "You can add the credentials in settings, or point me at a saved config file and I can continue from there."
      },
      assistantMeta: {
        time: "9:08 AM",
        usage: "10.4k ↓611 R212.9k",
        model: "gpt-5.1-codex"
      }
    },
    composer: {
      placeholder: "Message Assistant (Enter to send)",
      helper: "Files and voice input will connect here next.",
      send: "Send",
      sending: "Sending..."
    },
    states: {
      loading: "Loading this chat session...",
      empty: "This session is empty. Send the first message to start a local run.",
      streaming: "Streaming reply..."
    },
    errors: {
      load: "Could not load this chat session.",
      send: "Could not send this message."
    }
  },
  providers: {
    title: "Provider API keys",
    description: "Connect the official model providers Ducky should use.",
    summary: "providers ready",
    status: {
      ready: "Ready",
      missing: "Needs API key",
      optional: "Optional key"
    },
    actions: {
      add: "Add provider",
      save: "Save key",
      test: "Test connection",
      testing: "Testing...",
      saving: "Saving...",
      saved: "Saved"
    },
    form: {
      helper: "Enter the API key for this provider and save it locally.",
      saved: "API key saved locally"
    },
    errors: {
      load: "Could not load providers right now.",
      save: "Could not save this API key.",
      test: "Could not test this provider right now."
    },
    custom: {
      title: "Add provider",
      description: "Create a custom provider with your own base URL and API key.",
      fields: {
        name: "Provider name",
        baseUrl: "Base URL",
        apiKey: "API key"
      },
      actions: {
        cancel: "Cancel",
        create: "Create provider",
        creating: "Creating..."
      },
      errors: {
        required: "Provider name and base URL are required.",
        create: "Could not create this provider."
      }
    }
  },
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
