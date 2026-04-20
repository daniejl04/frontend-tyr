import { env } from '@/lib/env';

type ApiOptions = RequestInit & {
  params?: Record<string, string | number>;
};

class ApiError extends Error {
  constructor(public status: number, message: string, public data?: any) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { params, headers, ...customConfig } = options;
  
  // Construir URL con Query Params si existen
  const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
  const url = `${env.api.baseUrl}${endpoint}${queryString}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
    // Aquí se podrían añadir headers de auth automáticamente
  };

  const config: RequestInit = {
    method: options.method || 'GET',
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    ...customConfig,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(response.status, errorData.message || 'Error de API', errorData);
    }

    // Si la respuesta está vacía (204 No Content), retornar objeto vacío
    if (response.status === 204) return {} as T;

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    
    // Error de red o parseo
    throw new Error(error instanceof Error ? error.message : 'Error de conexión desconocido');
  }
}

export const apiClient = {
  get: <T>(url: string, options?: ApiOptions) => request<T>(url, { ...options, method: 'GET' }),
  post: <T>(url: string, body: any, options?: ApiOptions) => 
    request<T>(url, { ...options, method: 'POST', body: JSON.stringify(body) }),
  put: <T>(url: string, body: any, options?: ApiOptions) => 
    request<T>(url, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  patch: <T>(url: string, body: any, options?: ApiOptions) => 
    request<T>(url, { ...options, method: 'PATCH', body: JSON.stringify(body) }),
  delete: <T>(url: string, options?: ApiOptions) => request<T>(url, { ...options, method: 'DELETE' }),
};
