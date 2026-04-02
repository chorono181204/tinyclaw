export function MenuIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronDownIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SunIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.25M12 19.25v2.25M21.5 12h-2.25M4.75 12H2.5M18.72 5.28l-1.59 1.59M6.87 17.13l-1.59 1.59M18.72 18.72l-1.59-1.59M6.87 6.87 5.28 5.28" strokeLinecap="round" />
    </svg>
  );
}

export function MoonIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20 14.2A7.8 7.8 0 1 1 9.8 4 6.2 6.2 0 0 0 20 14.2Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SystemIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3.5" y="4.5" width="17" height="12" rx="2" />
      <path d="M9 19.5h6M12 16.5v3" strokeLinecap="round" />
    </svg>
  );
}

export function EnglishFlagIcon() {
  return (
    <svg aria-hidden="true" className="size-4 rounded-full" viewBox="0 0 24 24">
      <defs>
        <clipPath id="flag-en-clip">
          <circle cx="12" cy="12" r="10" />
        </clipPath>
      </defs>
      <g clipPath="url(#flag-en-clip)">
        <rect width="24" height="24" fill="#0f4aa1" />
        <path d="M0 3.2V0h3.2L24 20.8V24h-3.2L0 3.2Zm20.8-3.2H24v3.2L3.2 24H0v-3.2L20.8 0Z" fill="#fff" />
        <path d="M0 4.8V0h1.6L24 22.4V24h-1.6L0 4.8ZM22.4 0H24v1.6L1.6 24H0v-1.6L22.4 0Z" fill="#d61f26" />
        <path d="M10 0h4v24h-4Z" fill="#fff" />
        <path d="M0 10h24v4H0Z" fill="#fff" />
        <path d="M10.8 0h2.4v24h-2.4Z" fill="#d61f26" />
        <path d="M0 10.8h24v2.4H0Z" fill="#d61f26" />
      </g>
      <circle cx="12" cy="12" r="9.25" fill="none" stroke="currentColor" strokeOpacity="0.12" />
    </svg>
  );
}

export function VietnameseFlagIcon() {
  return (
    <svg aria-hidden="true" className="size-4 rounded-full" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="#da251d" />
      <path d="m12 6.2 1.72 3.55 3.92.57-2.82 2.74.67 3.87L12 15.1l-3.49 1.83.67-3.87-2.82-2.74 3.92-.57L12 6.2Z" fill="#ffde00" />
      <circle cx="12" cy="12" r="9.25" fill="none" stroke="currentColor" strokeOpacity="0.12" />
    </svg>
  );
}

export function SidebarIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3.75 10.5 12 4l8.25 6.5v8.25a1.5 1.5 0 0 1-1.5 1.5h-4.5v-5.25h-4.5v5.25h-4.5a1.5 1.5 0 0 1-1.5-1.5Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M8 9h8M8 12.5h8M8 16h5" strokeLinecap="round" />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="6" width="16" height="12" rx="6" />
        <circle cx="9" cy="12" r="1.25" fill="currentColor" stroke="none" />
        <circle cx="15" cy="12" r="1.25" fill="currentColor" stroke="none" />
        <path d="M9 15c.9.75 1.9 1.1 3 1.1s2.1-.35 3-1.1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.75v2.5M12 18.75v2.5M21.25 12h-2.5M5.25 12h-2.5M18.54 5.46l-1.77 1.77M7.23 16.77l-1.77 1.77M18.54 18.54l-1.77-1.77M7.23 7.23 5.46 5.46" strokeLinecap="round" />
    </svg>
  );
}

export function ChatIcon() {
  return (
    <svg aria-hidden="true" className="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 17.25H4.75A1.75 1.75 0 0 1 3 15.5v-8A1.75 1.75 0 0 1 4.75 5.75h14.5A1.75 1.75 0 0 1 21 7.5v8a1.75 1.75 0 0 1-1.75 1.75H11l-4 3.25Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function OverviewIcon() {
  return (
    <svg aria-hidden="true" className="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 18V10M12 18V6M18 18v-4" strokeLinecap="round" />
    </svg>
  );
}

export function ChannelsIcon() {
  return (
    <svg aria-hidden="true" className="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9.5 14.5a4 4 0 0 1 0-5.66l2.5-2.5a4 4 0 0 1 5.66 5.66l-1.5 1.5" strokeLinecap="round" />
      <path d="M14.5 9.5a4 4 0 0 1 0 5.66l-2.5 2.5a4 4 0 1 1-5.66-5.66l1.5-1.5" strokeLinecap="round" />
    </svg>
  );
}

export function InstancesIcon() {
  return (
    <svg aria-hidden="true" className="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="7.5" cy="12" r="2.25" />
      <circle cx="16.5" cy="12" r="2.25" />
      <path d="M9.75 12h4.5" strokeLinecap="round" />
    </svg>
  );
}

export function SessionsIcon() {
  return (
    <svg aria-hidden="true" className="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 4.75h8l3 3v11.5A1.75 1.75 0 0 1 16.25 21h-9.5A1.75 1.75 0 0 1 5 19.25v-12.75A1.75 1.75 0 0 1 6.75 4.75Z" strokeLinejoin="round" />
      <path d="M9 11h6M9 15h6" strokeLinecap="round" />
    </svg>
  );
}

export function UsageIcon() {
  return (
    <svg aria-hidden="true" className="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 18V12M12 18V8M18 18V5" strokeLinecap="round" />
    </svg>
  );
}

export function CronJobsIcon() {
  return (
    <svg aria-hidden="true" className="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="7.25" />
      <path d="M12 8.5v4l2.75 1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AgentsIcon() {
  return (
    <svg aria-hidden="true" className="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="5" y="7" width="14" height="10" rx="3" />
      <path d="M9 7V5.25M15 7V5.25M9.5 11.25h.01M14.5 11.25h.01" strokeLinecap="round" />
      <path d="M9.5 14.25h5" strokeLinecap="round" />
    </svg>
  );
}

export function SkillsIcon() {
  return (
    <svg aria-hidden="true" className="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M13.25 2.75 6.75 12h4.5l-1.25 9.25L17.25 12h-4.5l.5-9.25Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function NodesIcon() {
  return (
    <svg aria-hidden="true" className="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="5" width="16" height="11" rx="1.75" />
      <path d="M9 19h6M12 16v3" strokeLinecap="round" />
    </svg>
  );
}

export function ConfigIcon() {
  return (
    <svg aria-hidden="true" className="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 4.5v1.5M12 18v1.5M19.5 12H18M6 12H4.5M17.3 6.7l-1.05 1.05M7.75 16.25 6.7 17.3M17.3 17.3l-1.05-1.05M7.75 7.75 6.7 6.7" strokeLinecap="round" />
      <circle cx="12" cy="12" r="6.25" />
    </svg>
  );
}

export function CommunicationsIcon() {
  return (
    <svg aria-hidden="true" className="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m4.75 11.5 14.5-6.25-3.5 13-4.75-4-6.25-2.75Z" strokeLinejoin="round" />
      <path d="m10.5 14.25 4.25-5.5" strokeLinecap="round" />
    </svg>
  );
}

export function DocsIcon() {
  return (
    <svg aria-hidden="true" className="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6.75 4.75h9.5A1.75 1.75 0 0 1 18 6.5v11a1.75 1.75 0 0 1-1.75 1.75h-9.5A1.75 1.75 0 0 1 5 17.5v-11a1.75 1.75 0 0 1 1.75-1.75Z" />
      <path d="M8.5 9h6.5M8.5 12h6.5M8.5 15h4" strokeLinecap="round" />
    </svg>
  );
}

export function MinimizeIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 12h12" strokeLinecap="round" />
    </svg>
  );
}

export function MaximizeIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="6" y="6" width="12" height="12" rx="1.5" />
    </svg>
  );
}

export function CloseWindowIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 7 17 17M17 7 7 17" strokeLinecap="round" />
    </svg>
  );
}

export function PlusIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BrainIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375M6.003 5.125A3 3 0 0 0 6.401 6.5M3.477 10.896a4 4 0 0 1 .585-.396M19.938 10.5a4 4 0 0 1 .585.396M6 18a4 4 0 0 1-1.967-.516M19.967 17.484A4 4 0 0 1 18 18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function RefreshIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 3v5h-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ExpandIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <polyline points="15 3 21 3 21 9" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="9 21 3 21 3 15" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="21" x2="14" y1="3" y2="10" strokeLinecap="round" />
      <line x1="3" x2="10" y1="21" y2="14" strokeLinecap="round" />
    </svg>
  );
}

export function StopCircleIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8.75v3.5" strokeLinecap="round" />
      <path d="M12 16h.01" strokeLinecap="round" />
    </svg>
  );
}

export function PaperclipIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MicIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" x2="12" y1="19" y2="22" strokeLinecap="round" />
    </svg>
  );
}

export function SendIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m22 2-7 20-4-9-9-4Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 2 11 13" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ZapIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FileTextIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="16" x2="8" y1="13" y2="13" strokeLinecap="round" />
      <line x1="16" x2="8" y1="17" y2="17" strokeLinecap="round" />
      <line x1="10" x2="8" y1="9" y2="9" strokeLinecap="round" />
    </svg>
  );
}

export function WrenchIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
