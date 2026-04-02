const API_BASE_URL = "http://127.0.0.1:8000";

export type ProviderItem = {
  id: string;
  name: string;
  description: string;
  docs_url: string;
  base_url: string | null;
  api_key_label: string;
  api_key_placeholder: string;
  requires_api_key: boolean;
  has_api_key: boolean;
  masked_api_key: string | null;
  is_custom: boolean;
};

type ProviderListResponse = {
  items: ProviderItem[];
};

type ChatModelCatalogResponse = {
  items: ChatModelOption[];
};

type ProviderUpdateResponse = {
  item: ProviderItem;
};

type CustomProviderCreateResponse = {
  item: ProviderItem;
};

export type ProviderConnectionTestResult = {
  ok: boolean;
  message: string;
  status_code: number | null;
};

export type ChatModelOption = {
  value: string;
  label: string;
  provider_id: string;
  provider_name: string;
  model: string;
  requires_api_key: boolean;
  ready: boolean;
};

export type SessionItem = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  last_message_preview: string | null;
  message_count: number;
};

export type SessionMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
  created_at: string;
};

type SessionListResponse = {
  items: SessionItem[];
};

type SessionCreateResponse = {
  item: SessionItem;
};

type SessionMessagesResponse = {
  session: SessionItem;
  messages: SessionMessage[];
};

export type ChatStreamEvent =
  | { event: "started"; payload: { message: SessionMessage; run_id: string; session_id: string } }
  | {
      event: "tool_started";
      payload: {
        id: string;
        tool_id: string;
        tool_name: string;
        detail: string;
        kind: "exec" | "read";
        status: "running";
        summary: string;
      };
    }
  | {
      event: "tool_finished";
      payload: {
        id: string;
        tool_id: string;
        tool_name: string;
        detail: string;
        kind: "exec" | "read";
        status: "completed";
        summary: string;
        result_summary?: string;
      };
    }
  | { event: "message_delta"; payload: { delta: string; run_id: string } }
  | { event: "done"; payload: { message: SessionMessage; model: string | null; run_id: string; session: SessionItem } };

export type ToolCatalogItem = {
  id: string;
  name: string;
  description: string;
  category: "exec" | "read";
  enabled: boolean;
  reason: string | null;
};

type ToolCatalogResponse = {
  items: ToolCatalogItem[];
};

export type AppSettings = {
  chat_defaults: {
    provider_id: string | null;
    model: string | null;
  };
  onboarding: {
    complete: boolean;
    needs_provider_setup: boolean;
    needs_default_model: boolean;
  };
  runtime: {
    ready_models: number;
    total_models: number;
  };
};

export type AppSettingsUpdate = {
  chat_defaults: {
    provider_id: string | null;
    model: string | null;
  };
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function listProviders() {
  return request<ProviderListResponse>("/providers");
}

export function listChatModels() {
  return request<ChatModelCatalogResponse>("/providers/models");
}

export function getAppSettings() {
  return request<AppSettings>("/settings");
}

export function updateAppSettings(payload: AppSettingsUpdate) {
  return request<AppSettings>("/settings", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function saveProviderApiKey(providerId: string, apiKey: string) {
  return request<ProviderUpdateResponse>(`/providers/${providerId}`, {
    method: "PUT",
    body: JSON.stringify({ api_key: apiKey }),
  });
}

export function createCustomProvider(payload: {
  name: string;
  base_url: string;
  api_key: string;
}) {
  return request<CustomProviderCreateResponse>("/providers", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function testProviderConnection(providerId: string) {
  return request<ProviderConnectionTestResult>(`/providers/${providerId}/test`, {
    method: "POST",
  });
}

export function listSessions() {
  return request<SessionListResponse>("/sessions");
}

export function listTools() {
  return request<ToolCatalogResponse>("/tools");
}

export function createSession(payload: { title?: string }) {
  return request<SessionCreateResponse>("/sessions", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getSession(sessionId: string) {
  return request<SessionMessagesResponse>(`/sessions/${sessionId}`);
}

export async function sendSessionMessage(
  sessionId: string,
  payload: { message: string; model?: string; provider_id?: string },
  onEvent: (event: ChatStreamEvent) => void,
) {
  const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok || !response.body) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    buffer += decoder.decode(value, { stream: true });
    const events = buffer.split("\n\n");
    buffer = events.pop() ?? "";

    for (const rawEvent of events) {
      const lines = rawEvent.split("\n");
      const event = lines.find((line) => line.startsWith("event: "))?.slice(7);
      const data = lines.find((line) => line.startsWith("data: "))?.slice(6);
      if (!event || !data) {
        continue;
      }
      onEvent({
        event: event as ChatStreamEvent["event"],
        payload: JSON.parse(data),
      } as ChatStreamEvent);
    }
  }
}
