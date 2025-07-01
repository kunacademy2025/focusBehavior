import {
  ApiRequestConfig,
  ApiResponse,
  ApiService,
  HttpMethod,
} from "./apiService";
import { ServiceName } from "./servicesNames";

export class DefaultApiService<T> extends ApiService<T> {
  private readonly endpoint: ServiceName;

  constructor(serviceName: ServiceName) {
    super();
    this.endpoint = serviceName;
  }

  async get(
    urlOrConfig?: string | ApiRequestConfig<T>,
    maybeConfig?: ApiRequestConfig<T>
  ): Promise<ApiResponse<T>> {
    // Check if the first parameter is a string (url)
    if (typeof urlOrConfig === "string") {
      return this.request<T>(`/${urlOrConfig}`, HttpMethod.GET, maybeConfig);
    }
    // If the first parameter is not a string, it's the config
    return this.request<T>(`/${this.endpoint}`, HttpMethod.GET, urlOrConfig);
  }

  async post(data: any, config?: ApiRequestConfig<T>): Promise<ApiResponse<T>> {
    return this.request<T>(`/${this.endpoint}`, HttpMethod.POST, {
      ...config,
      body: data,
    });
  }

  async put(
    id: string | number,
    data: any,
    config?: ApiRequestConfig<T>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(`/${this.endpoint}/${id}`, HttpMethod.PUT, {
      ...config,
      body: data,
    });
  }

  async delete(
    id: string | number,
    config?: ApiRequestConfig<T>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(
      `/${this.endpoint}/${id}`,
      HttpMethod.DELETE,
      config
    );
  }

  async patch(
    id: string | number,
    data: any,
    config?: ApiRequestConfig<T>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(`/${this.endpoint}/${id}`, HttpMethod.PATCH, {
      ...config,
      body: data,
    });
  }

  async getAll(config?: ApiRequestConfig<T>): Promise<ApiResponse<T[]>> {
    return this.request<T[]>(`/${this.endpoint}`, HttpMethod.GET, config);
  }

  async getOne(
    id: string | number,
    config?: ApiRequestConfig<T>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(`/${this.endpoint}/${id}`, HttpMethod.GET, config);
  }

  async getOneBySlug(
    slug: string | number,
    config?: ApiRequestConfig<T>
  ): Promise<ApiResponse<T>> {
    const slugFilter = { slug: { $eq: slug } };

    const customFilters = config?.queryParams?.filters || {};
    const mergedFilters = {
      ...customFilters,
      ...slugFilter,
    };

    const response = await this.request<T[]>(
      `/${this.endpoint}`,
      HttpMethod.GET,
      {
        ...config,
        queryParams: {
          ...config?.queryParams,
          filters: mergedFilters,
        },
      }
    );
    return {
      ...response,
      data: response.data[0],
    };
  }

  async getSeo(
    idOrUrl?: string | number | ApiRequestConfig<T>,
    config?: ApiRequestConfig<T>
  ): Promise<ApiResponse<any>> {
    let url: string = `/${this.endpoint}`;

    if (typeof idOrUrl === "string") {
      url = `/${idOrUrl}`;
    } else if (typeof idOrUrl === "number") {
      url = `/${this.endpoint}${idOrUrl ? `/${idOrUrl}` : ""}`;
    } else {
      config = idOrUrl as ApiRequestConfig<T>;
    }

    const queryParams: any = {
      populate: {
        seo: {
          populate: { metaImage: true },
        },
      },
      ...config?.queryParams,
    };

    const response = await this.request<
      T & {
        seo: any;
      }
    >(url, HttpMethod.GET, {
      ...config,
      queryParams: {
        ...queryParams,
      },
    });

    return response.data?.seo || null;
  }
}
