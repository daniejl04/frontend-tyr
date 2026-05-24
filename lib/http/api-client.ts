import { env } from "@/lib/config/env";

type ApiOptions = RequestInit & {
  params?: Record<string, string | number>;
};

class ApiError extends Error {
  constructor(public status: number, message: string, public data?: unknown) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const { params, headers, ...customConfig } = options;

  let queryString = "";
  if (params) {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(
        ([_, v]) => v !== undefined && v !== null && v !== ""
      )
    );
    if (Object.keys(cleanParams).length > 0) {
      queryString = `?${new URLSearchParams(cleanParams as Record<string, string>).toString()}`;
    }
  }
  const url = `${env.api.baseUrl}${endpoint}${queryString}`;

  const requestHeaders = new Headers(headers);
  if (!(customConfig.body instanceof FormData)) {
    if (!requestHeaders.has("Content-Type")) {
      requestHeaders.set("Content-Type", "application/json");
    }
  }

  const config: RequestInit = {
    method: options.method || "GET",
    headers: requestHeaders,
    ...customConfig,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        response.status,
        (errorData as { message?: string }).message || "Error de API",
        errorData
      );
    }

    if (response.status === 204) return {} as T;

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;

    throw new Error(
      error instanceof Error ? error.message : "Error de conexión desconocido"
    );
  }
}

export const apiClient = {
  get: <T>(url: string, options?: ApiOptions) =>
    request<T>(url, { ...options, method: "GET" }),
  post: <T>(url: string, body: unknown, options?: ApiOptions) =>
    request<T>(url, {
      ...options,
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),
  put: <T>(url: string, body: unknown, options?: ApiOptions) =>
    request<T>(url, {
      ...options,
      method: "PUT",
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),
  patch: <T>(url: string, body: unknown, options?: ApiOptions) =>
    request<T>(url, {
      ...options,
      method: "PATCH",
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),
  delete: <T>(url: string, options?: ApiOptions) =>
    request<T>(url, { ...options, method: "DELETE" }),
};
