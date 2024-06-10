import axios, { AxiosRequestConfig } from 'axios';
import { merge } from 'lodash-es';

export class ApiError {
  responseStatus: number;
  errorMessage: string;

  public constructor (error: unknown) {
    const e = error as { response: { status: number }, message: string } | null;
    this.responseStatus = e?.response?.status ?? 0;
    this.errorMessage = e?.message ?? 'Client error';
  }
}

export class HttpProtocol {
  protected urlBase;

  /**
   * Creates a new service instance.
   * @param path A base path for all requests this service will make. Defaults to `/api`.
   */
  public constructor (path: string) {
    this.urlBase = path;
  }
  /**
   * Returns a new instance of the base config for all requests this service makes.
   * @protected
   */
  protected getConfig (): AxiosRequestConfig {
    return {
      headers: {
        "accept": "application/json",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
    };
  }

  /**
   * Make a GET request.
   * @param path A path to append to the base url.
   * @param configOverrides A config object to merge onto the base config.
   * @public
   */
  public async get<T> (
    path = '',
    configOverrides: AxiosRequestConfig | undefined = undefined,
  ): Promise<T> {
    return await this.requestResultWrapper<T>(path, configOverrides, (fullPath, config) => {
      return axios.get(fullPath, config);
    });
  }

  /**
   * Make a POST request.
   * @param path A path to append to the base url.
   * @param data Optional data to send with the request.
   * @param configOverrides A config object to merge onto the base config.
   * @public
   */
  public async post<T> (
    path = '',
    data: unknown = undefined,
    configOverrides: AxiosRequestConfig | undefined = undefined,
  ): Promise<T> {
    return await this.requestResultWrapper<T>(path, configOverrides, (fullPath, config) => {
      return axios.post(fullPath, data, config);
    });
  }

  /**
   * Make a PUT request.
   * @param path A path to append to the base url.
   * @param data Optional data to send with the request.
   * @param configOverrides A config object to merge onto the base config.
   * @public
   */
  public async put<T> (
    path = '',
    data: unknown = undefined,
    configOverrides: AxiosRequestConfig | undefined = undefined,
  ): Promise<T> {
    return await this.requestResultWrapper<T>(path, configOverrides, (fullPath, config) => {
      return axios.put(fullPath, data, config);
    });
  }

  /**
   * Make a PATCH request.
   * @param path A path to append to the base url.
   * @param data Optional data to send with the request.
   * @param configOverrides A config object to merge onto the base config.
   * @public
   */
  public async patch<T> (
    path = '',
    data: unknown = undefined,
    configOverrides: AxiosRequestConfig | undefined = undefined,
  ): Promise<T> {
    return await this.requestResultWrapper<T>(path, configOverrides, (fullPath, config) => {
      return axios.patch(fullPath, data, config);
    });
  }

  /**
   * Make a DELETE request.
   * @param path A path to append to the base url.
   * @param configOverrides A config object to merge onto the base config.
   * @public
   */
  public async delete<T> (
    path = '',
    configOverrides: AxiosRequestConfig | undefined = undefined,
  ): Promise<T> {
    return await this.requestResultWrapper<T>(path, configOverrides, (fullPath, config) => {
      return axios.delete(fullPath, config);
    });
  }

  private async requestResultWrapper<T> (
    subPath: string,
    configOverrides: AxiosRequestConfig | undefined,
    request: (fullPath: string, config: AxiosRequestConfig | undefined) => Promise<{data: unknown} | null>,
  ): Promise<T> {
    if (subPath.length > 0 && subPath[0] !== '/') subPath = `/${subPath}`;
    const config = merge(this.getConfig() || {}, configOverrides || {});
    try {
      const responseData: T = (await request(`${this.urlBase}${subPath}`, config))?.data as T;
      return responseData;
    } catch (e) {
      throw new ApiError(e);
    }
  }
}