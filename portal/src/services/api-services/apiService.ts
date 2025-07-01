// Apis Methods
import { RequestParams } from "./interfaces";
import { buildQueryString, flattenAttributes } from "./helpers";
import { COMMON_ENDPOINTS_TAGE } from "./constatnts";
import { API_ACCESS_TOKEN } from "@/config";

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

// Request and Response Shapes
export interface ApiRequestConfig<T> extends RequestInit {
  headers?: HeadersInit;
  queryParams?: Partial<RequestParams<T>>;
  body?: any;
  nextConfig?: NextFetchRequestConfig;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  success: boolean;
  meta?: any;
  error?: any;
}

export abstract class ApiService<T> {
  protected baseUrl: string = String(process.env.NEXT_PUBLIC_API_URL);

  // Generic request method
  protected async request<T>(
    url: string,
    method: HttpMethod,
    config: ApiRequestConfig<any> = {}
  ): Promise<ApiResponse<T>> {
    try {
      const { queryParams, headers, body, nextConfig } = config;
      const queryString = buildQueryString(queryParams);
      const fullUrl = `${this.baseUrl}${url}${queryString}`;

      console.log(`[Request] ${method} ${fullUrl}`);
  
      const response = await fetch(fullUrl, {
        // cache: Boolean(process.env.IS_PRODUCTION) ? "force-cache" : "no-cache",
        cache: "no-cache",
        ...config,
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_ACCESS_TOKEN}`,
          ...(headers || {}),
        },
        body: body ? JSON.stringify(body) : undefined,
        next: {
          tags: [COMMON_ENDPOINTS_TAGE, url],
          ...nextConfig,
        },
      });

      return this.handleResponse<T>(response, method);
    } catch (error) {
      // logger for debugging
      console.error(`[Error] ${method} ${url}`, error);
      throw error;
    }
  }

  // Handle the response with typed data and error handling
  protected async handleResponse<T>(
    response: Response,
    method: string
  ): Promise<ApiResponse<T>> {
    const responseData = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMessage = responseData?.message || "Unknown Error";
      console.error(
        `[Response Error] ${response?.status} ${response?.statusText}: ${errorMessage}`,
        responseData
      );

      // Return an error object instead of throwing
      return {
        data: null as T,
        status: response.status,
        success: false,
        meta: responseData?.meta || null,
        error: {
          message: errorMessage,
          status: response.status,
          details: responseData || {},
        },
      };
    }

    return {
      data: flattenAttributes(responseData?.data || responseData) as T,
      status: response.status,
      success: response.ok,
      meta: responseData.meta,
    };
  }

  // Abstract CRUD methods

  // api/payment/check-status/4
  // api/payment/recreate/4

  abstract get<R = T>(
    pathSegmentsOrConfig?: (string | number)[] | ApiRequestConfig<R>,
    config?: ApiRequestConfig<R>
  ): Promise<ApiResponse<R>>;

  abstract post<R = T>(
    data: any,
    pathSegmentsOrConfig?: (string | number)[] | ApiRequestConfig<R>,
    config?: ApiRequestConfig<R>
  ): Promise<ApiResponse<R>>;

  abstract put<R = T>(
    id: string | number,
    data: any,
    pathSegmentsOrConfig?: (string | number)[] | ApiRequestConfig<R>,
    config?: ApiRequestConfig<R>
  ): Promise<ApiResponse<R>>;

  abstract delete<R = T>(
    id: string | number,
    pathSegmentsOrConfig?: (string | number)[] | ApiRequestConfig<R>,
    config?: ApiRequestConfig<R>
  ): Promise<ApiResponse<R>>;

  abstract patch<R = T>(
    id: string | number,
    data: any,
    pathSegmentsOrConfig?: (string | number)[] | ApiRequestConfig<R>,
    config?: ApiRequestConfig<R>
  ): Promise<ApiResponse<R>>;

  abstract getById<R = T>(
    id: string | number,
    config?: ApiRequestConfig<R>
  ): Promise<ApiResponse<R>>;

  abstract getBySlug<R = T>(
    slug: string,
    config?: ApiRequestConfig<R>
  ): Promise<ApiResponse<R>>;

  abstract getSeo<R = any>(
    identifierOrConfig?: string | number | ApiRequestConfig<R>,
    config?: ApiRequestConfig<R>
  ): Promise<ApiResponse<R>>;

  abstract clearCache(pattern?: string): void;
}

// Error Object
export class ApiError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
