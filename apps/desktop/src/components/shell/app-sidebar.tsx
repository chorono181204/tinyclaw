import logoUrl from "../../../../../assets/logo.png";
import { SidebarIcon } from "./icons";
import type { Translator } from "../../i18n/provider";

const navKeys = ["workspace", "tasks", "agents", "settings"] as const;

export function AppSidebar({
  open,
  t
}: {
  open: boolean;
  t: Translator;
}) {
  return (
    <aside
      className={`shrink-0 bg-sidebar text-sidebar-foreground transition-[width,padding] duration-200 ${
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

        <nav className={`flex flex-col ${open ? "gap-1.5 pt-2" : "items-center gap-3 pt-2"}`}>
          {navKeys.map((item, index) => (
            <button
              aria-label={t(`shell.nav.${item}`)}
              className={`flex w-full items-center rounded-xl text-sm transition-colors ${
                index === 0
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground/80 hover:bg-muted/50 hover:text-foreground"
              } ${open ? "h-11 justify-start px-2.5" : "h-10 w-10 justify-center"}`}
              key={item}
              type="button"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center">
                <SidebarIcon index={index} />
              </span>
              <span
                className={`overflow-hidden whitespace-nowrap transition-[width,opacity,margin] duration-200 ${
                  open ? "ml-0.5 w-auto opacity-100" : "ml-0 w-0 opacity-0"
                }`}
              >
                {t(`shell.nav.${item}`)}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
