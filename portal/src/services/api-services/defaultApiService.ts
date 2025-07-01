import {
  ApiRequestConfig,
  ApiResponse,
  ApiService,
  HttpMethod,
} from "./apiService";
import { ServiceName } from "./servicesNames";

type CacheEntry = {
  data: any;
  expires: number;
};

const DEFAULT_CACHE_TTL = 0; // 1 minute
const CACHE_KEY_PREFIX = "api_cache_";

export class DefaultApiService<T> extends ApiService<T> {
  private readonly endpoint: ServiceName;
  private cache: Map<string, CacheEntry> = new Map();

  constructor(serviceName: ServiceName) {
    super();
    this.endpoint = serviceName;
  }

  // Unified request handler with caching
  private async _request<R = T>(
    method: HttpMethod,
    pathSegments: (string | number)[] = [],
    config?: ApiRequestConfig<R>,
    body?: any
  ): Promise<ApiResponse<R>> {
    const url = this.buildUrl(pathSegments);
    const cacheKey = this.getCacheKey(method, url, config?.queryParams);

    // Cache handling for GET requests
    if (method === HttpMethod.GET && this.cache.has(cacheKey)) {
      const entry = this.cache.get(cacheKey)!;
      if (entry.expires > Date.now()) {
        return entry.data;
      }
      this.cache.delete(cacheKey);
    }

    const response = await super.request<R>(url, method, {
      ...config,
      body,
      queryParams: this.mergeQueryParams(config?.queryParams),
    });

    if (method === HttpMethod.GET) {
      this.cache.set(cacheKey, {
        data: response,
        expires: Date.now() + (config?.cacheTtl || DEFAULT_CACHE_TTL),
      });
    }

    return response;
  }

  // URL construction helper
  private buildUrl(segments: (string | number)[]): string {
    return `/${segments.filter(Boolean).join("/")}`;
  }

  // Cache key generator
  private getCacheKey(
    method: HttpMethod,
    url: string,
    params?: Record<string, any>
  ): string {
    const paramString = params ? JSON.stringify(params) : "";
    return `${CACHE_KEY_PREFIX}${method}:${url}:${paramString}`;
  }

  // Query parameter merger
  private mergeQueryParams(params?: Record<string, any>): Record<string, any> {
    const defaults = {
      // populate: "*", // Example default population
    };

    return { ...defaults, ...params };
  }

  // Core CRUD operations
  async get<R = T>(
    pathSegmentsOrConfig?: (string | number)[] | ApiRequestConfig<R>,
    config?: ApiRequestConfig<R>
  ): Promise<ApiResponse<R>> {
    const { pathSegments, finalConfig } = this.normalizePathSegmentsAndConfig(
      pathSegmentsOrConfig,
      config
    );
    return this._request<R>(
      HttpMethod.GET,
      [this.endpoint, ...pathSegments],
      finalConfig
    );
  }

  async getAll<R = T>(
    pathSegmentsOrConfig?: (string | number)[] | ApiRequestConfig<R>,
    config?: ApiRequestConfig<R>
  ): Promise<ApiResponse<R[]>> {
    const { pathSegments, finalConfig } = this.normalizePathSegmentsAndConfig(
      pathSegmentsOrConfig,
      config
    );
    return this._request<R[]>(
      HttpMethod.GET,
      [this.endpoint, ...pathSegments],
      finalConfig
    );
  }

  async post<R = T>(
    data: any,
    pathSegmentsOrConfig?: (string | number)[] | ApiRequestConfig<R>,
    config?: ApiRequestConfig<R>
  ): Promise<ApiResponse<R>> {
    const { pathSegments, finalConfig } = this.normalizePathSegmentsAndConfig(
      pathSegmentsOrConfig,
      config
    );
    return this._request<R>(
      HttpMethod.POST,
      [this.endpoint, ...pathSegments],
      finalConfig,
      data
    );
  }

  async put<R = T>(
    id: string | number,
    data: any,
    pathSegmentsOrConfig?: (string | number)[] | ApiRequestConfig<R>,
    config?: ApiRequestConfig<R>
  ): Promise<ApiResponse<R>> {
    const { pathSegments, finalConfig } = this.normalizePathSegmentsAndConfig(
      pathSegmentsOrConfig,
      config
    );
    return this._request<R>(
      HttpMethod.PUT,
      [this.endpoint, id, ...pathSegments],
      finalConfig,
      data
    );
  }

  async delete<R = T>(
    id: string | number,
    pathSegmentsOrConfig?: (string | number)[] | ApiRequestConfig<R>,
    config?: ApiRequestConfig<R>
  ): Promise<ApiResponse<R>> {
    const { pathSegments, finalConfig } = this.normalizePathSegmentsAndConfig(
      pathSegmentsOrConfig,
      config
    );
    return this._request<R>(
      HttpMethod.DELETE,
      [this.endpoint, id, ...pathSegments],
      finalConfig
    );
  }

  async patch<R = T>(
    id: string | number,
    data: any,
    pathSegmentsOrConfig?: (string | number)[] | ApiRequestConfig<R>,
    config?: ApiRequestConfig<R>
  ): Promise<ApiResponse<R>> {
    const { pathSegments, finalConfig } = this.normalizePathSegmentsAndConfig(
      pathSegmentsOrConfig,
      config
    );
    return this._request<R>(
      HttpMethod.PATCH,
      [this.endpoint, id, ...pathSegments],
      finalConfig,
      data
    );
  }

  // Specialized methods
  async getById<R = T>(
    id: string | number,
    config?: ApiRequestConfig<R>
  ): Promise<ApiResponse<R>> {
    return this.get<R>([id], config);
  }

  async getBySlug<R = T>(
    slug: string,
    config?: ApiRequestConfig<R>
  ): Promise<ApiResponse<R>> {
    return this.get<R>([], {
      ...config,
      queryParams: {
        ...config?.queryParams,
        filters: { slug: { $eq: slug } } as any,
      },
    }).then((res) => ({
      ...res,
      data: Array.isArray(res.data) ? res.data[0] : res.data,
    }));
  }

  async getSeo<R = any>(
    identifierOrConfig?: string | number | ApiRequestConfig<R>,
    config?: ApiRequestConfig<R>
  ): Promise<ApiResponse<R>> {
    let pathSegments: (string | number)[] = [];
    let finalConfig: ApiRequestConfig<R> | undefined;

    if (
      typeof identifierOrConfig === "string" ||
      typeof identifierOrConfig === "number"
    ) {
      pathSegments = [identifierOrConfig];
      finalConfig = config;
    } else {
      finalConfig = identifierOrConfig as ApiRequestConfig<R>;
    }

    return this.get<R>(pathSegments, this.mergeSeoParams(finalConfig)).then(
      (res) => ({
        ...res,
        data: (res.data as any)?.seo || null,
      })
    );
  }

  private mergeSeoParams(
    config?: ApiRequestConfig<any>
  ): ApiRequestConfig<any> {
    return {
      ...config,
      queryParams: {
        ...config?.queryParams,
        populate: {
          seo: { populate: { metaImage: true } },
          ...config?.queryParams?.populate,
        },
      },
    };
  }

  // Cache management
  clearCache(pattern?: string): void {
    if (!pattern) {
      this.cache.clear();
      return;
    }

    const regex = new RegExp(pattern);
    for (const [key] of this.cache) {
      if (regex.test(key)) {
        this.cache.delete(key);
      }
    }
  }

  // Helper to normalize pathSegments and config
  private normalizePathSegmentsAndConfig<R>(
    pathSegmentsOrConfig?: (string | number)[] | ApiRequestConfig<R>,
    config?: ApiRequestConfig<R>
  ): { pathSegments: (string | number)[]; finalConfig: ApiRequestConfig<R> } {
    if (Array.isArray(pathSegmentsOrConfig)) {
      return {
        pathSegments: pathSegmentsOrConfig,
        finalConfig: config || {},
      };
    } else {
      return {
        pathSegments: [],
        finalConfig: (pathSegmentsOrConfig as ApiRequestConfig<R>) || {},
      };
    }
  }
}
