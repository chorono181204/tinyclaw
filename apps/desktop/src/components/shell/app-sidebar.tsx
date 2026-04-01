import logoUrl from "../../assets/logo-ui.png";
import { useState, type ReactElement } from "react";
import { cn } from "../../lib/cn";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import {
  AgentsIcon,
  ChannelsIcon,
  ChatIcon,
  CommunicationsIcon,
  ConfigIcon,
  CronJobsIcon,
  DocsIcon,
  InstancesIcon,
  NodesIcon,
  OverviewIcon,
  SessionsIcon,
  SkillsIcon,
  UsageIcon
} from "./icons";
import type { Translator } from "../../i18n/provider";

const menuSections = [
  {
    key: "chat",
    items: [{ key: "chat", icon: ChatIcon, active: true }]
  },
  {
    key: "control",
    items: [
      { key: "overview", icon: OverviewIcon },
      { key: "channels", icon: ChannelsIcon },
      { key: "instances", icon: InstancesIcon },
      { key: "sessions", icon: SessionsIcon },
      { key: "usage", icon: UsageIcon },
      { key: "cronJobs", icon: CronJobsIcon }
    ]
  },
  {
    key: "agent",
    items: [
      { key: "agents", icon: AgentsIcon },
      { key: "skills", icon: SkillsIcon },
      { key: "nodes", icon: NodesIcon }
    ]
  },
  {
    key: "settings",
    items: [
      { key: "config", icon: ConfigIcon },
      { key: "communications", icon: CommunicationsIcon },
      { key: "docs", icon: DocsIcon }
    ]
  }
] as const;

type MenuItem = {
  active?: boolean;
  icon: () => ReactElement;
  key:
    | "chat"
    | "overview"
    | "channels"
    | "instances"
    | "sessions"
    | "usage"
    | "cronJobs"
    | "agents"
    | "skills"
    | "nodes"
    | "config"
    | "communications"
    | "docs";
};

function SectionChevron() {
  return (
    <svg aria-hidden="true" className="size-4 text-muted-foreground/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SidebarItem({
  active,
  icon: Icon,
  label,
  open
}: {
  active?: boolean;
  icon: () => React.JSX.Element;
  label: string;
  open: boolean;
}) {
  const button = (
    <button
      aria-label={label}
      className={cn(
        "flex w-full items-center rounded-[var(--radius)] text-sm outline-none transition-colors",
        active
          ? "bg-primary/14 text-foreground shadow-xs ring-1 ring-primary/25 hover:bg-primary/18 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
          : "text-muted-foreground/80 hover:bg-muted/35 hover:text-foreground",
        open ? "h-9 justify-start px-2.5" : "size-9 justify-center"
      )}
      type="button"
    >
      <span className="flex size-9 shrink-0 items-center justify-center">
        <Icon />
      </span>
      <span
        className={cn(
          "overflow-hidden whitespace-nowrap transition-[width,opacity,margin] duration-200",
          open ? "ml-0.5 w-auto opacity-100" : "ml-0 w-0 opacity-0"
        )}
      >
        {label}
      </span>
    </button>
  );

  if (open) {
    return button;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}

function SidebarSection({
  items,
  label,
  open,
  t
}: {
  items: readonly MenuItem[];
  label: string;
  open: boolean;
  t: Translator;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <section className={cn("flex flex-col", open ? "gap-1.5" : "items-center gap-3")}>
      {open ? (
        <button
          className="flex items-center justify-between rounded-lg px-2.5 pb-2 pt-3 text-left outline-none transition-colors hover:text-foreground"
          onClick={() => setExpanded((value) => !value)}
          type="button"
        >
          <p className="text-[13px] font-semibold tracking-[0.12em] text-muted-foreground/90">
            {label}
          </p>
          <span className={cn("transition-transform duration-200", expanded ? "rotate-0" : "-rotate-90")}>
            <SectionChevron />
          </span>
        </button>
      ) : null}

      {(!open || expanded) &&
        items.map((item) => (
          <SidebarItem
            active={item.active}
            icon={item.icon}
            key={item.key}
            label={t(`shell.nav.${item.key}`)}
            open={open}
          />
        ))}
    </section>
  );
}

export function AppSidebar({
  open,
  t
}: {
  open: boolean;
  t: Translator;
}) {
  return (
    <aside
      className={cn(
        "shrink-0 overflow-y-auto border-r border-border/60 bg-sidebar text-sidebar-foreground transition-[width,padding] duration-200",
        open ? "w-68 px-3 py-4" : "w-16 px-2 py-4"
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-center pb-6">
          <img
            alt={t("theme.brand")}
            className="h-8 w-auto shrink-0 object-contain"
            src={logoUrl}
          />
        </div>

        <div className={cn("flex flex-col", open ? "gap-4" : "gap-5")}>
          {menuSections.map((section) => (
            <SidebarSection
              items={section.items}
              key={section.key}
              label={t(`shell.sections.${section.key}`)}
              open={open}
              t={t}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
