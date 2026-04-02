import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";

import {
  BrainIcon,
  CheckIcon,
  ExpandIcon,
  FileTextIcon,
  MicIcon,
  PaperclipIcon,
  RefreshIcon,
  SendIcon,
  StopCircleIcon,
  WrenchIcon,
  ZapIcon,
} from "../../components/shell/icons";
import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import type { Translator } from "../../i18n/provider";
import { cn } from "../../lib/cn";
import {
  getAppSettings,
  type ChatModelOption,
  type ChatStreamEvent,
  type SessionItem,
  type SessionMessage,
  type ToolCatalogItem,
  getSession,
  listTools,
  listChatModels,
  listSessions,
  sendSessionMessage,
  updateAppSettings,
} from "../../lib/api";

type ChatScreenProps = {
  initialSessionId?: string | null;
  onSessionChange?: (sessionId: string) => void;
  t: Translator;
};

type ToolItem = {
  detail: string;
  id: string;
  kind: "exec" | "read";
  status: "completed" | "running";
  summary: string;
  toolId: string;
  toolName: string;
  resultSummary?: string;
};

function ToolbarSelect({
  onValueChange,
  options,
  value,
}: {
  onValueChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
  value: string;
}) {
  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger className="h-11 min-w-[240px] rounded-[var(--radius)] border-border/60 bg-card px-4 text-sm font-medium shadow-none">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="rounded-[var(--radius)] border-border/60 bg-card">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function ChatActionButton({
  active = false,
  destructive = false,
  disabled = false,
  icon,
  onClick,
}: {
  active?: boolean;
  destructive?: boolean;
  disabled?: boolean;
  icon: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      className={cn(
        "flex size-11 items-center justify-center rounded-[var(--radius)] border text-sm outline-none transition-colors disabled:opacity-50",
        destructive
          ? "border-destructive/40 text-destructive hover:bg-destructive/10"
          : active
            ? "border-primary/40 bg-primary/12 text-primary"
            : "border-border/60 bg-card text-muted-foreground hover:text-foreground",
      )}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {icon}
    </button>
  );
}

function ToolSummary({
  expanded,
  item,
  onToggle,
  t,
}: {
  expanded: boolean;
  item: ToolItem;
  onToggle: () => void;
  t: Translator;
}) {
  const isRead = item.kind === "read";

  return (
    <div className="space-y-2">
      <button
        className="flex w-full items-center gap-2 text-left text-sm"
        onClick={onToggle}
        type="button"
      >
        <span className={cn("transition-transform", expanded ? "rotate-90" : "")}>
          <ExpandIcon />
        </span>
        <span className="text-primary">
          <ZapIcon />
        </span>
        <span className="font-semibold text-foreground">{item.summary}</span>
        <span className="text-muted-foreground">
          {isRead ? t("chat.tools.readLabel") : t("chat.tools.execLabel")}
        </span>
      </button>

      {expanded ? (
      <div className="rounded-[calc(var(--radius)+2px)] bg-card px-5 py-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              {isRead ? <FileTextIcon /> : <WrenchIcon />}
              <span>{item.toolName}</span>
            </div>
            <p className="max-w-3xl text-sm leading-6 text-muted-foreground">{item.detail}</p>
            {item.resultSummary ? (
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{t("chat.tools.result")}: </span>
                {item.resultSummary}
              </p>
            ) : null}
            <p className="text-sm text-muted-foreground/80">
              {item.status === "completed" ? t("chat.tools.completed") : t("chat.tools.running")}
            </p>
          </div>

          <span className="text-muted-foreground/80">
            {item.status === "completed" ? <CheckIcon /> : <ZapIcon />}
          </span>
        </div>
      </div>
      ) : null}
    </div>
  );
}

function ToolsSheet({
  items,
  open,
  onOpenChange,
  t,
}: {
  items: ToolCatalogItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  t: Translator;
}) {
  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
      <SheetContent className="border-border/60 bg-background sm:max-w-md">
        <SheetHeader className="border-b border-border/60 px-5 py-5">
          <SheetTitle>{t("chat.tools.title")}</SheetTitle>
          <SheetDescription>{t("chat.tools.description")}</SheetDescription>
        </SheetHeader>

        <div className="app-scrollbar flex-1 space-y-3 overflow-y-auto px-5 py-5">
          {items.map((item) => (
            <div
              className="rounded-[calc(var(--radius)+2px)] border border-border/60 bg-card px-4 py-4"
              key={item.id}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    {item.category === "read" ? <FileTextIcon /> : <WrenchIcon />}
                    <span>{item.name}</span>
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
                  {!item.enabled && item.reason ? (
                    <p className="text-sm text-muted-foreground">{item.reason}</p>
                  ) : null}
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-xs font-medium",
                      item.enabled
                        ? "bg-primary/12 text-primary"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {item.enabled ? t("chat.tools.enabled") : t("chat.tools.blocked")}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.category === "read"
                      ? t("chat.tools.readCategory")
                      : t("chat.tools.execCategory")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function MessageBubble({
  message,
  t,
}: {
  message: SessionMessage;
  t: Translator;
}) {
  const isUser = message.role === "user";
  return (
    <div
      className={cn(
        "max-w-4xl rounded-[calc(var(--radius)+4px)] px-6 py-5 shadow-xs",
        isUser
          ? "ml-auto bg-primary/10 text-foreground ring-1 ring-primary/20"
          : "bg-card text-foreground",
      )}
    >
      <div className="space-y-4 text-[15px] leading-7 text-foreground">
        <p>{message.content}</p>
      </div>

      <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">
          {isUser ? t("chat.mock.userLabel") : t("chat.mock.assistantName")}
        </span>
        <span>{new Date(message.created_at).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</span>
        {!isUser ? <span>{t("chat.mock.assistantMeta.model")}</span> : null}
      </div>
    </div>
  );
}

export function ChatScreen({ initialSessionId, onSessionChange, t }: ChatScreenProps) {
  const [activeModel, setActiveModel] = useState("");
  const [activeSessionId, setActiveSessionId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingModels, setIsLoadingModels] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<SessionMessage[]>([]);
  const [modelOptions, setModelOptions] = useState<ChatModelOption[]>([]);
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [streamingAssistant, setStreamingAssistant] = useState("");
  const [toolCatalog, setToolCatalog] = useState<ToolCatalogItem[]>([]);
  const [toolCatalogError, setToolCatalogError] = useState<string | null>(null);
  const [toolItems, setToolItems] = useState<ToolItem[]>([]);
  const [toolSheetOpen, setToolSheetOpen] = useState(false);
  const [toolExpandedMap, setToolExpandedMap] = useState<Record<string, boolean>>({});

  const sessionOptions = useMemo(
    () => sessions.map((session) => ({ label: session.title, value: session.id })),
    [sessions],
  );
  const selectedModelOption = useMemo(
    () => modelOptions.find((option) => option.value === activeModel) ?? modelOptions[0],
    [activeModel, modelOptions],
  );

  useEffect(() => {
    void loadSessions(true);
    void loadChatModels();
    void loadTools();
  }, []);

  useEffect(() => {
    if (initialSessionId) {
      setActiveSessionId(initialSessionId);
    }
  }, [initialSessionId]);

  useEffect(() => {
    if (modelOptions.length === 0) {
      return;
    }
    void loadChatDefaults();
  }, [modelOptions]);

  useEffect(() => {
    if (!activeSessionId) {
      return;
    }
    void loadSession(activeSessionId, false);
  }, [activeSessionId]);

  async function loadSessions(setDefault = false) {
    setError(null);
    setIsLoading(true);
    try {
      const response = await listSessions();
      setSessions(response.items);
      if (response.items.length > 0) {
        const matchedInitial = initialSessionId
          ? response.items.find((item) => item.id === initialSessionId)
          : null;
        if (matchedInitial) {
          setActiveSessionId(matchedInitial.id);
          onSessionChange?.(matchedInitial.id);
        } else if (setDefault || !activeSessionId) {
          setActiveSessionId((current) => current || response.items[0].id);
          onSessionChange?.(response.items[0].id);
        }
      }
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : t("chat.errors.load"));
    } finally {
      setIsLoading(false);
    }
  }

  async function loadChatModels() {
    try {
      const response = await listChatModels();
      setModelOptions(response.items);
      setActiveModel((current) => current || response.items[0]?.value || "");
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : t("chat.errors.load"));
    } finally {
      setIsLoadingModels(false);
    }
  }

  async function loadTools() {
    try {
      const response = await listTools();
      setToolCatalog(response.items);
      setToolCatalogError(null);
    } catch {
      setToolCatalogError(t("chat.errors.tools"));
    }
  }

  async function loadChatDefaults() {
    try {
      const response = await getAppSettings();
      const providerId = response.chat_defaults.provider_id;
      const model = response.chat_defaults.model;
      if (!providerId || !model) {
        return;
      }
      const matched = modelOptions.find(
        (option) => option.provider_id === providerId && option.model === model,
      );
      if (matched) {
        setActiveModel(matched.value);
      }
    } catch {
      // Keep the backend catalog default if settings are not available yet.
    }
  }

  async function loadSession(sessionId: string, showRefreshing = true) {
    if (showRefreshing) {
      setIsRefreshing(true);
    }
    setError(null);
    try {
      const response = await getSession(sessionId);
      setMessages(response.messages);
      onSessionChange?.(response.session.id);
      setSessions((current) =>
        current.map((item) => (item.id === response.session.id ? response.session : item)),
      );
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : t("chat.errors.load"));
    } finally {
      if (showRefreshing) {
        setIsRefreshing(false);
      }
    }
  }

  async function handleSend() {
    const trimmed = message.trim();
    if (!trimmed || !activeSessionId || isSending) {
      return;
    }
    if (!selectedModelOption) {
      setError(t("chat.errors.load"));
      return;
    }

    setIsSending(true);
    setError(null);
    setStreamingAssistant("");
    setToolItems([]);
    setMessage("");

    try {
      await sendSessionMessage(
        activeSessionId,
        {
          message: trimmed,
          model: selectedModelOption.model,
          provider_id: selectedModelOption.provider_id,
        },
        handleStreamEvent,
      );
      await loadSession(activeSessionId, false);
      await loadSessions(false);
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : t("chat.errors.send"));
      setMessage(trimmed);
    } finally {
      setIsSending(false);
      setStreamingAssistant("");
    }
  }

  async function handleModelChange(value: string) {
    setActiveModel(value);
    const option = modelOptions.find((item) => item.value === value);
    if (!option) {
      return;
    }
    try {
      await updateAppSettings({
        chat_defaults: {
          provider_id: option.provider_id,
          model: option.model,
        },
      });
    } catch {
      // Keep the UI responsive even if settings persistence fails.
    }
  }

  function handleStreamEvent(event: ChatStreamEvent) {
    if (event.event === "started") {
      setMessages((current) => [...current, event.payload.message]);
      onSessionChange?.(event.payload.session_id);
      return;
    }

    if (event.event === "tool_started") {
      setToolItems((current) => [
        ...current,
        {
          id: event.payload.id,
          toolId: event.payload.tool_id,
          toolName: event.payload.tool_name,
          detail: event.payload.detail,
          kind: event.payload.kind,
          status: event.payload.status,
          summary: event.payload.summary,
        },
      ]);
      setToolExpandedMap((current) => ({ ...current, [event.payload.id]: true }));
      return;
    }

    if (event.event === "tool_finished") {
      setToolItems((current) =>
        current.map((item) =>
          item.id === event.payload.id
            ? {
                ...item,
                status: "completed",
                resultSummary: event.payload.result_summary,
              }
            : item,
        ),
      );
      return;
    }

    if (event.event === "message_delta") {
      setStreamingAssistant((current) => `${current}${event.payload.delta}`);
      return;
    }

    if (event.event === "done") {
      setMessages((current) => [...current, event.payload.message]);
      onSessionChange?.(event.payload.session.id);
      setSessions((current) =>
        current.map((item) => (item.id === event.payload.session.id ? event.payload.session : item)),
      );
    }
  }

  const hasMessages = messages.length > 0 || toolItems.length > 0 || Boolean(streamingAssistant);

  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <div className="flex items-center justify-between gap-4 border-b border-border/60 px-6 py-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{t("theme.brand")}</span>
            <span>›</span>
            <span className="font-medium text-foreground">{t("shell.nav.chat")}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ChatActionButton disabled={!activeSessionId || isRefreshing} icon={<RefreshIcon />} onClick={() => void loadSession(activeSessionId)} />
          <div className="h-6 w-px bg-border/60" />
          <ChatActionButton active={toolSheetOpen} icon={<BrainIcon />} onClick={() => setToolSheetOpen(true)} />
          <ChatActionButton icon={<ExpandIcon />} />
          <ChatActionButton destructive disabled={!isSending} icon={<StopCircleIcon />} />
        </div>
      </div>

      <div className="flex items-center gap-4 border-b border-border/60 px-6 py-4">
        <ToolbarSelect
          onValueChange={(value) => {
            setActiveSessionId(value);
            onSessionChange?.(value);
          }}
          options={sessionOptions}
          value={activeSessionId || ""}
        />
        <ToolbarSelect
          onValueChange={handleModelChange}
          options={modelOptions.map((model) => ({ label: model.label, value: model.value }))}
          value={activeModel || modelOptions[0]?.value || ""}
        />
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        <div className="app-scrollbar flex h-full flex-col overflow-y-auto">
          <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 pb-6 pt-6">
            <div className="flex flex-1 flex-col justify-end gap-6">
              {(isLoading || isLoadingModels) && !hasMessages ? (
                <div className="rounded-[calc(var(--radius)+4px)] bg-card px-6 py-5 text-sm text-muted-foreground">
                  {t("chat.states.loading")}
                </div>
              ) : null}

              {!isLoading && !isLoadingModels && !hasMessages ? (
                <div className="rounded-[calc(var(--radius)+4px)] bg-card px-6 py-5 text-sm text-muted-foreground">
                  {t("chat.states.empty")}
                </div>
              ) : null}

              {messages.map((item) => (
                <MessageBubble key={item.id} message={item} t={t} />
              ))}

              {toolItems.length > 0 ? (
                <div className="max-w-3xl space-y-4">
                  {toolItems.map((item) => (
                    <ToolSummary
                      expanded={toolExpandedMap[item.id] ?? true}
                      item={item}
                      key={item.id}
                      onToggle={() =>
                        setToolExpandedMap((current) => ({
                          ...current,
                          [item.id]: !(current[item.id] ?? true),
                        }))
                      }
                      t={t}
                    />
                  ))}
                </div>
              ) : null}

              {!hasMessages && toolCatalogError ? (
                <div className="rounded-[calc(var(--radius)+4px)] border border-destructive/40 bg-destructive/8 px-6 py-4 text-sm text-destructive">
                  {toolCatalogError}
                </div>
              ) : null}

              {streamingAssistant ? (
                <div className="max-w-4xl rounded-[calc(var(--radius)+4px)] bg-card px-6 py-5 shadow-xs">
                  <div className="space-y-4 text-[15px] leading-7 text-foreground">
                    <p>{streamingAssistant}</p>
                  </div>

                  <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{t("chat.mock.assistantName")}</span>
                    <span>{t("chat.states.streaming")}</span>
                    <span>{selectedModelOption?.label}</span>
                  </div>
                </div>
              ) : null}

              {error ? (
                <div className="rounded-[calc(var(--radius)+4px)] border border-destructive/40 bg-destructive/8 px-6 py-4 text-sm text-destructive">
                  {error}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border/60 px-6 py-4">
        <div className="mx-auto w-full max-w-6xl">
          <div className="rounded-[calc(var(--radius)+6px)] bg-card px-4 py-4 shadow-xs ring-1 ring-border/60">
            <Textarea
              className="min-h-[96px] resize-none border-0 bg-transparent px-0 py-0 text-[15px] leading-6 shadow-none focus-visible:border-0 focus-visible:ring-0"
              onChange={(event) => setMessage(event.target.value)}
              placeholder={t("chat.composer.placeholder")}
              value={message}
            />

            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Button className="text-muted-foreground" size="icon" variant="outline">
                  <PaperclipIcon />
                </Button>
                <Button className="text-muted-foreground" size="icon" variant="outline">
                  <MicIcon />
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">
                  {isSending ? t("chat.states.streaming") : t("chat.composer.helper")}
                </span>
                <Button
                  className="min-w-[118px]"
                  disabled={!message.trim() || isSending || !activeSessionId || !selectedModelOption}
                  onClick={handleSend}
                >
                  <SendIcon />
                  {isSending ? t("chat.composer.sending") : t("chat.composer.send")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToolsSheet items={toolCatalog} onOpenChange={setToolSheetOpen} open={toolSheetOpen} t={t} />
    </div>
  );
}
