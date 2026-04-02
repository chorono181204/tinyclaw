export const en = {
  chat: {
    session: {
      main: "main",
      workspace: "workspace",
      review: "review"
    },
    tools: {
      title: "Tools",
      description: "Review which local tools are active for chat runs right now.",
      enabled: "Enabled",
      blocked: "Blocked",
      result: "Result",
      readCategory: "Read",
      execCategory: "Exec",
      completed: "Completed",
      running: "Running",
      execLabel: "exec",
      readLabel: "read",
      empty: "Tool activity will appear here during a chat run.",
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
      tools: "Could not load the tool catalog right now.",
      send: "Could not send this message."
    }
  },
  onboarding: {
    badge: "First-run setup",
    title: "Connect one provider and pick the default model for Ducky",
    description:
      "This setup follows the lightweight OpenClaw-style wizard shape, but keeps everything local and inside the desktop app.",
    loading: "Preparing first-run setup...",
    providerHelper: "Save or test the provider here, then choose the model Ducky should use by default.",
    optionalKey: "This provider can be used without a stored API key, so you can move straight to model selection.",
    modelPlaceholder: "Choose a model",
    steps: {
      step1: {
        label: "Step 1",
        body: "Choose the provider you want Ducky to use first."
      },
      step2: {
        label: "Step 2",
        body: "Save and test the API key so the runtime is really ready."
      },
      step3: {
        label: "Step 3",
        body: "Pick the default model and finish setup to unlock chat."
      }
    },
    runtime: {
      title: "Runtime readiness",
      description: "Ducky checks the same provider and model state that the chat workspace uses.",
      providers: "Ready providers",
      models: "Ready models",
      current: "Current setup state",
      readyState: "This setup is complete. Ducky can open the chat workspace with a provider-backed default.",
      pendingState: "Finish one provider-backed model selection before the chat workspace becomes the default entry point."
    },
    actions: {
      finish: "Finish setup",
      openConfig: "Open full config"
    },
    errors: {
      load: "Could not load the first-run setup right now.",
      save: "Could not save this setup step.",
      test: "Could not test this provider right now.",
      defaultModel: "Choose a provider and model before finishing setup."
    }
  },
  sessions: {
    title: "Sessions",
    description: "Review, rename, archive, and reopen your local conversation history.",
    detailDescription: "Keep a session tidy here, then jump back into chat when you want to continue.",
    createPlaceholder: "New session title",
    previewFallback: "No messages yet in this session.",
    current: "Current",
    messages: "messages",
    noSelection: "Select a session",
    noSelectionDescription: "Choose a session from the list to inspect its transcript and actions.",
    userLabel: "You",
    assistantLabel: "Assistant",
    tabs: {
      active: "Active",
      archived: "Archived"
    },
    actions: {
      create: "Create session",
      creating: "Creating...",
      openChat: "Open in chat",
      archive: "Archive",
      restore: "Restore",
      rename: "Rename",
      saving: "Saving...",
      saved: "Saved"
    },
    states: {
      loading: "Loading sessions...",
      empty: "No active sessions yet.",
      emptyArchived: "No archived sessions yet.",
      emptyMessages: "This session does not have any messages yet."
    },
    errors: {
      load: "Could not load sessions right now.",
      detail: "Could not load this session transcript.",
      create: "Could not create a new session.",
      rename: "Could not rename this session.",
      archive: "Could not update the archive state for this session.",
      delete: "Could not delete this session."
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
    },
    runtime: {
      title: "Chat runtime",
      description: "Choose the default provider-backed model for new chat runs.",
      defaultModel: "Default model",
      save: "Save default",
      saving: "Saving...",
      saved: "Saved",
      ready: "models ready",
      current: "Current runtime default",
      helper: "The chat toolbar will restore this selection the next time the app opens."
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
