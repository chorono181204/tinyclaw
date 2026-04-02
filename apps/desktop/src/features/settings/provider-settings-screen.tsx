import { useEffect, useMemo, useState } from "react";

import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { PlusIcon } from "../../components/shell/icons";
import { listProviders, saveProviderApiKey, type ProviderItem } from "../../lib/api";
import type { Translator } from "../../i18n/provider";
import { CustomProviderDialog } from "./custom-provider-dialog";
import { ProviderLogo } from "./provider-icons";

type DraftMap = Record<string, string>;
type SaveStateMap = Record<string, "idle" | "saving" | "saved">;

function ProviderStatus({
  hasApiKey,
  requiresApiKey,
  t,
}: {
  hasApiKey: boolean;
  requiresApiKey: boolean;
  t: Translator;
}) {
  return (
    <Badge variant={hasApiKey ? "default" : "outline"}>
      {hasApiKey
        ? t("providers.status.ready")
        : requiresApiKey
          ? t("providers.status.missing")
          : t("providers.status.optional")}
    </Badge>
  );
}

function ProviderCard({
  draftValue,
  item,
  onDraftChange,
  onSave,
  saveState,
  t,
}: {
  draftValue: string;
  item: ProviderItem;
  onDraftChange: (value: string) => void;
  onSave: () => void;
  saveState: "idle" | "saving" | "saved";
  t: Translator;
}) {
  const helperText = item.has_api_key
    ? item.masked_api_key ?? t("providers.form.saved")
    : t("providers.form.helper");

  return (
    <Card className="gap-0 overflow-hidden border-border/70 py-0 shadow-xs">
      <CardHeader className="flex flex-row items-start justify-between gap-4 px-5 py-5">
        <div className="flex items-start gap-4">
          <ProviderLogo providerId={item.id} />
          <div className="space-y-1">
            <CardTitle>{item.name}</CardTitle>
            <CardDescription className="max-w-[34ch] leading-6">
              {item.description}
            </CardDescription>
          </div>
        </div>
          <ProviderStatus
            hasApiKey={item.has_api_key}
            requiresApiKey={item.requires_api_key}
            t={t}
          />
      </CardHeader>

      <CardContent className="border-t border-border/60 px-5 py-5">
        <div className="grid gap-3">
          <label className="text-sm font-medium text-foreground">
            {item.api_key_label}
          </label>
          <Input
            onChange={(event) => onDraftChange(event.target.value)}
            placeholder={item.api_key_placeholder}
            type="password"
            value={draftValue}
          />
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">{helperText}</p>
            <Button onClick={onSave} size="sm" variant="default">
              {saveState === "saving"
                ? t("providers.actions.saving")
                : saveState === "saved"
                  ? t("providers.actions.saved")
                  : t("providers.actions.save")}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ProviderSettingsScreen({ t }: { t: Translator }) {
  const [customProviderDialogOpen, setCustomProviderDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [providers, setProviders] = useState<ProviderItem[]>([]);
  const [drafts, setDrafts] = useState<DraftMap>({});
  const [saveStates, setSaveStates] = useState<SaveStateMap>({});

  useEffect(() => {
    let alive = true;

    void listProviders()
      .then((response) => {
        if (!alive) {
          return;
        }
        setProviders(response.items);
        setDrafts(
          Object.fromEntries(response.items.map((item) => [item.id, ""])) satisfies DraftMap
        );
      })
      .catch(() => {
        if (!alive) {
          return;
        }
        setError(t("providers.errors.load"));
      });

    return () => {
      alive = false;
    };
  }, [t]);

  const readyCount = useMemo(
    () => providers.filter((item) => item.has_api_key).length,
    [providers]
  );

  async function handleSave(providerId: string) {
    const nextApiKey = drafts[providerId] ?? "";
    setSaveStates((current) => ({ ...current, [providerId]: "saving" }));
    setError(null);

    try {
      const response = await saveProviderApiKey(providerId, nextApiKey);
      setProviders((current) =>
        current.map((item) => (item.id === providerId ? response.item : item))
      );
      setDrafts((current) => ({ ...current, [providerId]: "" }));
      setSaveStates((current) => ({ ...current, [providerId]: "saved" }));
      window.setTimeout(() => {
        setSaveStates((current) => ({ ...current, [providerId]: "idle" }));
      }, 1200);
    } catch {
      setSaveStates((current) => ({ ...current, [providerId]: "idle" }));
      setError(t("providers.errors.save"));
    }
  }

  return (
    <div className="flex h-full min-h-0 flex-col gap-5">
      <div className="flex items-center justify-between gap-3">
        <Button onClick={() => setCustomProviderDialogOpen(true)}>
          <PlusIcon />
          {t("providers.actions.add")}
        </Button>
        <Badge variant="outline">
          {readyCount} / {providers.length} {t("providers.summary")}
        </Badge>
      </div>

      {error ? (
        <div className="rounded-[var(--radius)] border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 xl:grid-cols-2">
        {providers.map((item) => (
          <ProviderCard
            draftValue={drafts[item.id] ?? ""}
            item={item}
            key={item.id}
            onDraftChange={(value) =>
              setDrafts((current) => ({ ...current, [item.id]: value }))
            }
            onSave={() => void handleSave(item.id)}
            saveState={saveStates[item.id] ?? "idle"}
            t={t}
          />
        ))}
      </div>

      <CustomProviderDialog
        onCreate={(item) => {
          setProviders((current) =>
            [...current, item].sort((left, right) => left.name.localeCompare(right.name))
          );
          setDrafts((current) => ({ ...current, [item.id]: "" }));
          setSaveStates((current) => ({ ...current, [item.id]: "idle" }));
        }}
        onOpenChange={setCustomProviderDialogOpen}
        open={customProviderDialogOpen}
        t={t}
      />
    </div>
  );
}
