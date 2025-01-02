import axios, { AxiosInstance } from 'axios';
import { setupInterceptors } from './interptor';

const microservicesUrls = {
    baseService: '/api',
  };
  
export type ServiceType = keyof typeof microservicesUrls;

// Create axios instances for each service
const createAxiosInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Setup interceptors for this instance
  setupInterceptors(instance);

  return instance;
};

// Create and export service-specific instances
export const serviceInstances: Record<ServiceType, AxiosInstance> =
  Object.entries(microservicesUrls).reduce(
    (acc, [key, url]) => ({
      ...acc,
      [key]: createAxiosInstance(url)
    }),
    {} as Record<ServiceType, AxiosInstance>
  );

// Base API client class
export class APIClient {
  private instance: AxiosInstance;

  constructor(service: ServiceType) {
    this.instance = serviceInstances[service];
  }

  protected get axiosInstance() {
    return this.instance;
  }

  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    const queryString = params
      ? Object.keys(params)
          .map(key => `${key}=${params[key]}`)
          .join('&')
      : '';
    return this.instance.get(`${url}${queryString ? `?${queryString}` : ''}`);
  }

  async post<T>(url: string, data?: any, config?: any): Promise<T> {
    return this.instance.post(url, data, config);
  }

  async put<T>(url: string, data?: any): Promise<T> {
    return this.instance.put(url, data);
  }

  async patch<T>(
    url: string,
    data?: any,
    p0?: { headers: { 'Content-Type': string } }
  ): Promise<T> {
    return this.instance.patch(url, data);
  }

  async delete<T>(url: string): Promise<T> {
    return this.instance.delete(url);
  }
}
