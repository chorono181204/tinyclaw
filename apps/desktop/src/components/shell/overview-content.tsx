import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../ui/card";
import type { Translator } from "../../i18n/provider";

export function OverviewContent({ t }: { t: Translator }) {
  return (
    <Card className="gap-0 border-border/80 py-0 shadow-xs">
      <CardHeader className="px-8 pt-8">
        <p className="text-sm font-medium text-primary">{t("theme.brand")}</p>
        <CardTitle className="mt-3 max-w-3xl text-4xl tracking-tight sm:text-5xl">
          {t("shell.hero.title")}
        </CardTitle>
        <CardDescription className="max-w-2xl pt-2 text-base leading-7">
          {t("shell.hero.summary")}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-8 pb-8 pt-2">
        <div className="rounded-2xl border border-border bg-muted/30 px-5 py-4">
          <p className="text-sm font-medium text-foreground">
            {t("shell.nav.workspace")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
