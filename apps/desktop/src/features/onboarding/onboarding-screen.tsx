import { useEffect, useMemo, useState } from "react";

import { PlusIcon, RefreshIcon } from "../../components/shell/icons";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import type { Translator } from "../../i18n/provider";
import {
  type AppSettings,
  type ChatModelOption,
  type ProviderConnectionTestResult,
  type ProviderItem,
  getAppSettings,
  listChatModels,
  listProviders,
  saveProviderApiKey,
  testProviderConnection,
  updateAppSettings,
} from "../../lib/api";
import { cn } from "../../lib/cn";
import { CustomProviderDialog } from "../settings/custom-provider-dialog";
import { ProviderLogo } from "../settings/provider-icons";

type OnboardingScreenProps = {
  onComplete: () => void;
  onOpenConfig: () => void;
  t: Translator;
};

export function OnboardingScreen({
  onComplete,
  onOpenConfig,
  t,
}: OnboardingScreenProps) {
  const steps = [
    {
      bodyKey: "onboarding.steps.step1.body" as const,
      labelKey: "onboarding.steps.step1.label" as const,
    },
    {
      bodyKey: "onboarding.steps.step2.body" as const,
      labelKey: "onboarding.steps.step2.label" as const,
    },
    {
      bodyKey: "onboarding.steps.step3.body" as const,
      labelKey: "onboarding.steps.step3.label" as const,
    },
  ];

  const [chatModelOptions, setChatModelOptions] = useState<ChatModelOption[]>([]);
  const [customProviderDialogOpen, setCustomProviderDialogOpen] = useState(false);
  const [draftApiKey, setDraftApiKey] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [providers, setProviders] = useState<ProviderItem[]>([]);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedProviderId, setSelectedProviderId] = useState("");
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [testResult, setTestResult] = useState<ProviderConnectionTestResult | null>(null);
  const [testState, setTestState] = useState<"idle" | "testing">("idle");

  useEffect(() => {
    let alive = true;

    void Promise.all([listProviders(), listChatModels(), getAppSettings()])
      .then(([providerResponse, modelResponse, settingsResponse]) => {
        if (!alive) {
          return;
        }

        const providerItems = providerResponse.items;
        const defaultProviderId =
          settingsResponse.chat_defaults.provider_id
          ?? providerItems.find((item) => item.has_api_key)?.id
          ?? providerItems[0]?.id
          ?? "";

        const providerModels = modelResponse.items.filter(
          (item) => item.provider_id === defaultProviderId,
        );
        const defaultModel =
          providerModels.find(
            (item) =>
              item.provider_id === settingsResponse.chat_defaults.provider_id
              && item.model === settingsResponse.chat_defaults.model,
          )?.value
          ?? providerModels[0]?.value
          ?? "";

        setProviders(providerItems);
        setChatModelOptions(modelResponse.items);
        setSettings(settingsResponse);
        setSelectedProviderId(defaultProviderId);
        setSelectedModel(defaultModel);
      })
      .catch(() => {
        if (alive) {
          setError(t("onboarding.errors.load"));
        }
      })
      .finally(() => {
        if (alive) {
          setIsLoading(false);
        }
      });

    return () => {
      alive = false;
    };
  }, [t]);

  const selectedProvider = useMemo(
    () => providers.find((item) => item.id === selectedProviderId) ?? null,
    [providers, selectedProviderId],
  );

  const providerModels = useMemo(
    () => chatModelOptions.filter((item) => item.provider_id === selectedProviderId),
    [chatModelOptions, selectedProviderId],
  );

  const providerReadyCount = useMemo(
    () => providers.filter((item) => item.has_api_key || !item.requires_api_key).length,
    [providers],
  );

  useEffect(() => {
    if (!selectedProviderId) {
      return;
    }

    const nextModel =
      providerModels.find((item) => item.value === selectedModel)?.value
      ?? providerModels[0]?.value
      ?? "";
    setSelectedModel(nextModel);
    setDraftApiKey("");
    setTestResult(null);
  }, [providerModels, selectedModel, selectedProviderId]);

  async function refreshSettings() {
    const response = await getAppSettings();
    setSettings(response);
    if (response.onboarding.complete) {
      onComplete();
    }
  }

  async function handleSaveProvider() {
    if (!selectedProvider) {
      return;
    }

    setSaveState("saving");
    setError(null);

    try {
      const response = await saveProviderApiKey(selectedProvider.id, draftApiKey.trim());
      setProviders((current) =>
        current.map((item) => (item.id === selectedProvider.id ? response.item : item)),
      );
      setDraftApiKey("");
      setSaveState("saved");
      window.setTimeout(() => setSaveState("idle"), 1200);
      await refreshSettings();
    } catch {
      setSaveState("idle");
      setError(t("onboarding.errors.save"));
    }
  }

  async function handleTestProvider() {
    if (!selectedProvider) {
      return;
    }

    setTestState("testing");
    setError(null);

    try {
      const result = await testProviderConnection(selectedProvider.id);
      setTestResult(result);
    } catch {
      setTestResult({ ok: false, message: t("onboarding.errors.test"), status_code: null });
    } finally {
      setTestState("idle");
    }
  }

  async function handleFinish() {
    const selectedChatModel = providerModels.find((item) => item.value === selectedModel);
    if (!selectedProvider || !selectedChatModel) {
      setError(t("onboarding.errors.defaultModel"));
      return;
    }

    setSaveState("saving");
    setError(null);

    try {
      await updateAppSettings({
        chat_defaults: {
          provider_id: selectedProvider.id,
          model: selectedChatModel.model,
        },
      });
      await refreshSettings();
      setSaveState("saved");
    } catch {
      setSaveState("idle");
      setError(t("onboarding.errors.save"));
    }
  }

  return (
    <div className="flex h-full min-h-0 items-center justify-center bg-background px-6 py-8">
      <div className="grid w-full max-w-6xl gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="gap-0 overflow-hidden border-border/70 py-0 shadow-xs">
          <CardHeader className="gap-3 border-b border-border/60 px-8 py-8">
            <Badge className="w-fit" variant="default">
              {t("onboarding.badge")}
            </Badge>
            <CardTitle className="text-4xl leading-tight">
              {t("onboarding.title")}
            </CardTitle>
            <CardDescription className="max-w-2xl text-base leading-7">
              {t("onboarding.description")}
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-6 px-8 py-8">
            <div className="grid gap-4 md:grid-cols-3">
              {steps.map((step) => (
                <div
                  className="rounded-[calc(var(--radius)+4px)] border border-border/60 bg-card px-5 py-5"
                  key={step.labelKey}
                >
                  <p className="text-sm font-semibold text-primary">
                    {t(step.labelKey)}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {t(step.bodyKey)}
                  </p>
                </div>
              ))}
            </div>

            {error ? (
              <div className="rounded-[var(--radius)] border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            ) : null}

            <div className="grid gap-4 md:grid-cols-2">
              {providers.map((item) => {
                const active = item.id === selectedProviderId;
                const ready = item.has_api_key || !item.requires_api_key;

                return (
                  <button
                    className={cn(
                      "flex items-start gap-4 rounded-[calc(var(--radius)+4px)] border px-5 py-5 text-left transition-colors",
                      active
                        ? "border-primary/40 bg-primary/8 ring-1 ring-primary/20"
                        : "border-border/60 bg-card hover:border-primary/20",
                    )}
                    key={item.id}
                    onClick={() => setSelectedProviderId(item.id)}
                    type="button"
                  >
                    <ProviderLogo providerId={item.id} />
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{item.name}</span>
                        <Badge variant={ready ? "default" : "outline"}>
                          {ready ? t("providers.status.ready") : t("providers.status.missing")}
                        </Badge>
                      </div>
                      <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedProvider ? (
              <div className="grid gap-4 rounded-[calc(var(--radius)+4px)] border border-border/60 bg-card px-6 py-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-foreground">{selectedProvider.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("onboarding.providerHelper")}
                    </p>
                  </div>
                  <Button
                    onClick={() => setCustomProviderDialogOpen(true)}
                    size="sm"
                    variant="outline"
                  >
                    <PlusIcon />
                    {t("providers.actions.add")}
                  </Button>
                </div>

                {selectedProvider.requires_api_key ? (
                  <div className="grid gap-3">
                    <label className="text-sm font-medium text-foreground">
                      {selectedProvider.api_key_label}
                    </label>
                    <Input
                      onChange={(event) => setDraftApiKey(event.target.value)}
                      placeholder={selectedProvider.api_key_placeholder}
                      type="password"
                      value={draftApiKey}
                    />
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm text-muted-foreground">
                        {selectedProvider.has_api_key
                          ? selectedProvider.masked_api_key ?? t("providers.form.saved")
                          : t("providers.form.helper")}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button onClick={() => void handleTestProvider()} size="sm" variant="outline">
                          <span className={testState === "testing" ? "animate-spin" : ""}>
                            <RefreshIcon />
                          </span>
                          {testState === "testing"
                            ? t("providers.actions.testing")
                            : t("providers.actions.test")}
                        </Button>
                        <Button onClick={() => void handleSaveProvider()} size="sm">
                          {saveState === "saving"
                            ? t("providers.actions.saving")
                            : saveState === "saved"
                              ? t("providers.actions.saved")
                              : t("providers.actions.save")}
                        </Button>
                      </div>
                    </div>
                    {testResult ? (
                      <p className={cn("text-sm", testResult.ok ? "text-success" : "text-destructive")}>
                        {testResult.message}
                      </p>
                    ) : null}
                  </div>
                ) : (
                  <div className="rounded-[var(--radius)] bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
                    {t("onboarding.optionalKey")}
                  </div>
                )}

                <div className="grid gap-3">
                  <label className="text-sm font-medium text-foreground">
                    {t("providers.runtime.defaultModel")}
                  </label>
                  <Select onValueChange={setSelectedModel} value={selectedModel}>
                    <SelectTrigger className="h-11 rounded-[var(--radius)] border-border/60 bg-card px-4 text-sm font-medium shadow-none">
                      <SelectValue placeholder={t("onboarding.modelPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent className="rounded-[var(--radius)] border-border/60 bg-card">
                      {providerModels.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card className="gap-0 overflow-hidden border-border/70 py-0 shadow-xs">
          <CardHeader className="gap-3 border-b border-border/60 px-6 py-6">
            <CardTitle>{t("onboarding.runtime.title")}</CardTitle>
            <CardDescription>{t("onboarding.runtime.description")}</CardDescription>
          </CardHeader>

          <CardContent className="grid gap-5 px-6 py-6">
            <div className="grid gap-3">
              <div className="flex items-center justify-between rounded-[var(--radius)] bg-card px-4 py-3 ring-1 ring-border/60">
                <span className="text-sm text-muted-foreground">{t("onboarding.runtime.providers")}</span>
                <span className="font-semibold text-foreground">
                  {providerReadyCount} / {providers.length}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-[var(--radius)] bg-card px-4 py-3 ring-1 ring-border/60">
                <span className="text-sm text-muted-foreground">{t("onboarding.runtime.models")}</span>
                <span className="font-semibold text-foreground">
                  {settings?.runtime.ready_models ?? 0} / {settings?.runtime.total_models ?? 0}
                </span>
              </div>
            </div>

            <div className="rounded-[calc(var(--radius)+4px)] border border-border/60 bg-card px-5 py-5">
              <p className="text-sm font-semibold text-foreground">{t("onboarding.runtime.current")}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {settings?.onboarding.complete
                  ? t("onboarding.runtime.readyState")
                  : t("onboarding.runtime.pendingState")}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                disabled={isLoading || !selectedProviderId || !selectedModel || saveState === "saving"}
                onClick={() => void handleFinish()}
              >
                {t("onboarding.actions.finish")}
              </Button>
              <Button onClick={onOpenConfig} variant="outline">
                {t("onboarding.actions.openConfig")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <CustomProviderDialog
        onCreate={(item) => {
          setProviders((current) =>
            [...current, item].sort((left, right) => left.name.localeCompare(right.name)),
          );
          setSelectedProviderId(item.id);
        }}
        onOpenChange={setCustomProviderDialogOpen}
        open={customProviderDialogOpen}
        t={t}
      />
    </div>
  );
}
