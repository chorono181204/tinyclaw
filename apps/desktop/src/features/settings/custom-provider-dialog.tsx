import { useEffect, useState } from "react";

import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import type { ProviderItem } from "../../lib/api";
import { createCustomProvider } from "../../lib/api";
import type { Translator } from "../../i18n/provider";

export function CustomProviderDialog({
  onCreate,
  onOpenChange,
  open,
  t,
}: {
  onCreate: (item: ProviderItem) => void;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  t: Translator;
}) {
  const [apiKey, setApiKey] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) {
      setName("");
      setBaseUrl("");
      setApiKey("");
      setError(null);
      setSaving(false);
    }
  }, [open]);

  async function handleSubmit() {
    if (!name.trim() || !baseUrl.trim()) {
      setError(t("providers.custom.errors.required"));
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const response = await createCustomProvider({
        name: name.trim(),
        base_url: baseUrl.trim(),
        api_key: apiKey.trim(),
      });
      onCreate(response.item);
      onOpenChange(false);
    } catch {
      setError(t("providers.custom.errors.create"));
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("providers.custom.title")}</DialogTitle>
          <DialogDescription>{t("providers.custom.description")}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          {error ? (
            <div className="rounded-[var(--radius)] border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          ) : null}

          <div className="grid gap-2">
            <label className="text-sm font-medium text-foreground">
              {t("providers.custom.fields.name")}
            </label>
            <Input onChange={(event) => setName(event.target.value)} value={name} />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-foreground">
              {t("providers.custom.fields.baseUrl")}
            </label>
            <Input
              onChange={(event) => setBaseUrl(event.target.value)}
              placeholder="https://api.example.com/v1"
              type="url"
              value={baseUrl}
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-foreground">
              {t("providers.custom.fields.apiKey")}
            </label>
            <Input
              onChange={(event) => setApiKey(event.target.value)}
              placeholder="sk-..."
              type="password"
              value={apiKey}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{t("providers.custom.actions.cancel")}</Button>
          </DialogClose>
          <Button onClick={() => void handleSubmit()}>
            {saving ? t("providers.custom.actions.creating") : t("providers.custom.actions.create")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
