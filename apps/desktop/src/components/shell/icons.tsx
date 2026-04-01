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

export function CheckIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m5 12.5 4.25 4.25L19 7" strokeLinecap="round" strokeLinejoin="round" />
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
