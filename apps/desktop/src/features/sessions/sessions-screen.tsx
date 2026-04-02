import { useEffect, useMemo, useState } from "react";

import { CheckIcon, FileTextIcon, PlusIcon, TrashIcon } from "../../components/shell/icons";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import type { Translator } from "../../i18n/provider";
import {
  createSession,
  deleteSession,
  getSession,
  listSessions,
  type SessionItem,
  type SessionMessage,
  updateSession,
} from "../../lib/api";
import { cn } from "../../lib/cn";

type SessionsScreenProps = {
  activeSessionId: string | null;
  onOpenChatSession: (sessionId: string) => void;
  t: Translator;
};

export function SessionsScreen({
  activeSessionId,
  onOpenChatSession,
  t,
}: SessionsScreenProps) {
  const [activeTab, setActiveTab] = useState<"active" | "archived">("active");
  const [composeTitle, setComposeTitle] = useState("");
  const [detailMessages, setDetailMessages] = useState<SessionMessage[]>([]);
  const [detailSessionId, setDetailSessionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [renameDraft, setRenameDraft] = useState("");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");
  const [sessions, setSessions] = useState<SessionItem[]>([]);

  const activeSessions = useMemo(
    () => sessions.filter((item) => item.archived_at === null),
    [sessions],
  );
  const archivedSessions = useMemo(
    () => sessions.filter((item) => item.archived_at !== null),
    [sessions],
  );
  const visibleSessions = activeTab === "active" ? activeSessions : archivedSessions;
  const selectedSession = useMemo(
    () => sessions.find((item) => item.id === detailSessionId) ?? visibleSessions[0] ?? null,
    [detailSessionId, sessions, visibleSessions],
  );

  useEffect(() => {
    void loadSessions();
  }, []);

  useEffect(() => {
    if (!selectedSession) {
      return;
    }
    setDetailSessionId(selectedSession.id);
    setRenameDraft(selectedSession.title);
    void loadSessionDetail(selectedSession.id);
  }, [selectedSession?.id]);

  async function loadSessions() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await listSessions({ includeArchived: true });
      setSessions(response.items);
    } catch {
      setError(t("sessions.errors.load"));
    } finally {
      setIsLoading(false);
    }
  }

  async function loadSessionDetail(sessionId: string) {
    try {
      const response = await getSession(sessionId);
      setDetailMessages(response.messages);
      setSessions((current) =>
        current.map((item) => (item.id === response.session.id ? response.session : item)),
      );
      setRenameDraft(response.session.title);
    } catch {
      setError(t("sessions.errors.detail"));
    }
  }

  async function handleCreateSession() {
    setIsCreating(true);
    setError(null);
    try {
      const response = await createSession({ title: composeTitle.trim() || undefined });
      setComposeTitle("");
      await loadSessions();
      setDetailSessionId(response.item.id);
      onOpenChatSession(response.item.id);
    } catch {
      setError(t("sessions.errors.create"));
    } finally {
      setIsCreating(false);
    }
  }

  async function handleRenameSession() {
    if (!selectedSession) {
      return;
    }
    setSaveState("saving");
    setError(null);
    try {
      const response = await updateSession(selectedSession.id, { title: renameDraft.trim() });
      setSessions((current) =>
        current.map((item) => (item.id === response.item.id ? response.item : item)),
      );
      setSaveState("saved");
      window.setTimeout(() => setSaveState("idle"), 1200);
    } catch {
      setSaveState("idle");
      setError(t("sessions.errors.rename"));
    }
  }

  async function handleArchiveToggle() {
    if (!selectedSession) {
      return;
    }

    setError(null);
    try {
      const response = await updateSession(selectedSession.id, {
        archived: selectedSession.archived_at === null,
      });
      setSessions((current) =>
        current.map((item) => (item.id === response.item.id ? response.item : item)),
      );
      if (response.item.archived_at !== null && activeTab === "active") {
        setDetailSessionId(null);
      }
      if (response.item.archived_at === null && activeTab === "archived") {
        setDetailSessionId(null);
      }
    } catch {
      setError(t("sessions.errors.archive"));
    }
  }

  async function handleDeleteSession() {
    if (!selectedSession || selectedSession.id === "main") {
      return;
    }

    setError(null);
    try {
      await deleteSession(selectedSession.id);
      setSessions((current) => current.filter((item) => item.id !== selectedSession.id));
      setDetailMessages([]);
      setDetailSessionId(null);
    } catch {
      setError(t("sessions.errors.delete"));
    }
  }

  return (
    <div className="grid h-full min-h-0 grid-cols-[360px_minmax(0,1fr)] gap-6">
      <Card className="min-h-0 gap-0 overflow-hidden border-border/70 py-0 shadow-xs">
        <CardHeader className="gap-4 border-b border-border/60 px-5 py-5">
          <div className="space-y-1">
            <CardTitle>{t("sessions.title")}</CardTitle>
            <p className="text-sm text-muted-foreground">{t("sessions.description")}</p>
          </div>

          <div className="grid gap-3">
            <Input
              onChange={(event) => setComposeTitle(event.target.value)}
              placeholder={t("sessions.createPlaceholder")}
              value={composeTitle}
            />
            <Button disabled={isCreating} onClick={() => void handleCreateSession()}>
              <PlusIcon />
              {isCreating ? t("sessions.actions.creating") : t("sessions.actions.create")}
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => setActiveTab("active")}
              size="sm"
              variant={activeTab === "active" ? "default" : "outline"}
            >
              {t("sessions.tabs.active")}
            </Button>
            <Button
              onClick={() => setActiveTab("archived")}
              size="sm"
              variant={activeTab === "archived" ? "default" : "outline"}
            >
              {t("sessions.tabs.archived")}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="app-scrollbar min-h-0 flex-1 overflow-y-auto px-3 py-3">
          <div className="space-y-2">
            {isLoading ? (
              <div className="rounded-[var(--radius)] bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
                {t("sessions.states.loading")}
              </div>
            ) : null}

            {!isLoading && visibleSessions.length === 0 ? (
              <div className="rounded-[var(--radius)] bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
                {activeTab === "active" ? t("sessions.states.empty") : t("sessions.states.emptyArchived")}
              </div>
            ) : null}

            {visibleSessions.map((item) => (
              <button
                className={cn(
                  "w-full rounded-[calc(var(--radius)+2px)] border px-4 py-4 text-left transition-colors",
                  selectedSession?.id === item.id
                    ? "border-primary/40 bg-primary/8 ring-1 ring-primary/20"
                    : "border-border/60 bg-card hover:border-primary/20",
                )}
                key={item.id}
                onClick={() => setDetailSessionId(item.id)}
                type="button"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">{item.title}</p>
                    <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
                      {item.last_message_preview ?? t("sessions.previewFallback")}
                    </p>
                  </div>
                  {activeSessionId === item.id ? (
                    <Badge variant="default">{t("sessions.current")}</Badge>
                  ) : null}
                </div>
                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{item.message_count} {t("sessions.messages")}</span>
                  <span>{new Date(item.updated_at).toLocaleString()}</span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="min-h-0 gap-0 overflow-hidden border-border/70 py-0 shadow-xs">
        <CardHeader className="gap-4 border-b border-border/60 px-6 py-5">
          {selectedSession ? (
            <>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <CardTitle>{selectedSession.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{t("sessions.detailDescription")}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button onClick={() => onOpenChatSession(selectedSession.id)} size="sm" variant="default">
                    {t("sessions.actions.openChat")}
                  </Button>
                  <Button onClick={() => void handleArchiveToggle()} size="sm" variant="outline">
                    {selectedSession.archived_at ? t("sessions.actions.restore") : t("sessions.actions.archive")}
                  </Button>
                  <Button
                    disabled={selectedSession.id === "main"}
                    onClick={() => void handleDeleteSession()}
                    size="icon"
                    variant="outline"
                  >
                    <TrashIcon />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Input onChange={(event) => setRenameDraft(event.target.value)} value={renameDraft} />
                <Button onClick={() => void handleRenameSession()} size="sm">
                  {saveState === "saving"
                    ? t("sessions.actions.saving")
                    : saveState === "saved"
                      ? t("sessions.actions.saved")
                      : t("sessions.actions.rename")}
                </Button>
              </div>
            </>
          ) : (
            <CardTitle>{t("sessions.noSelection")}</CardTitle>
          )}
        </CardHeader>

        <CardContent className="app-scrollbar min-h-0 flex-1 overflow-y-auto px-6 py-6">
          {error ? (
            <div className="mb-4 rounded-[var(--radius)] border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          ) : null}

          {selectedSession ? (
            <div className="space-y-4">
              {detailMessages.length === 0 ? (
                <div className="rounded-[calc(var(--radius)+2px)] bg-muted/40 px-5 py-5 text-sm text-muted-foreground">
                  {t("sessions.states.emptyMessages")}
                </div>
              ) : null}

              {detailMessages.map((message) => (
                <div
                  className={cn(
                    "max-w-4xl rounded-[calc(var(--radius)+4px)] px-5 py-4 shadow-xs",
                    message.role === "user"
                      ? "ml-auto bg-primary/10 text-foreground ring-1 ring-primary/20"
                      : "bg-card text-foreground ring-1 ring-border/60",
                  )}
                  key={message.id}
                >
                  <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {message.role === "user" ? t("sessions.userLabel") : t("sessions.assistantLabel")}
                    </span>
                    <span>{new Date(message.created_at).toLocaleString()}</span>
                  </div>
                  <p className="whitespace-pre-wrap text-sm leading-7 text-foreground">{message.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-[calc(var(--radius)+2px)] bg-muted/40 px-5 py-5 text-sm text-muted-foreground">
              {t("sessions.noSelectionDescription")}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
