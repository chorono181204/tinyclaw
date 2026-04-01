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
