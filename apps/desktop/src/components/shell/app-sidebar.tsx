import logoUrl from "../../../../../assets/logo.png";
import { cn } from "../../lib/cn";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../ui/tooltip";
import { SidebarIcon } from "./icons";
import type { Translator } from "../../i18n/provider";

const navKeys = ["workspace", "tasks", "agents", "settings"] as const;

function SidebarNavItem({
  active,
  label,
  open,
  index,
}: {
  active: boolean;
  index: number;
  label: string;
  open: boolean;
}) {
  const button = (
    <button
      aria-label={label}
      className={cn(
        "flex w-full items-center rounded-xl text-sm outline-none transition-colors",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-xs"
          : "text-muted-foreground/80 hover:bg-sidebar-muted hover:text-sidebar-foreground",
        open ? "h-11 justify-start px-2.5" : "h-10 w-10 justify-center",
      )}
      type="button"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center">
        <SidebarIcon index={index} />
      </span>
      <span
        className={cn(
          "overflow-hidden whitespace-nowrap transition-[width,opacity,margin] duration-200",
          open ? "ml-0.5 w-auto opacity-100" : "ml-0 w-0 opacity-0",
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

export function AppSidebar({
  open,
  t
}: {
  open: boolean;
  t: Translator;
}) {
  return (
    <aside
      className={`shrink-0 rounded-2xl border border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width,padding] duration-200 ${
        open ? "w-64 px-3 py-4" : "w-16 px-2 py-4"
      }`}
    >
      <div className="flex h-full flex-col">
        <div className="flex justify-center pb-6">
          <div className="flex items-center justify-center">
            <img
              alt={t("theme.brand")}
              className="h-7 w-7 shrink-0"
              src={logoUrl}
            />
          </div>
        </div>

        <nav
          className={cn(
            "flex flex-col",
            open ? "gap-1.5 pt-2" : "items-center gap-3 pt-2",
          )}
        >
          {navKeys.map((item, index) => (
            <SidebarNavItem
              active={index === 0}
              index={index}
              key={item}
              label={t(`shell.nav.${item}`)}
              open={open}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
}
