import { ApiError } from './ApiError';

export default class ApiClient {
   private static readonly baseUrl: string = 'http://localhost:3000/api';

   private static readonly defaultOptions: RequestInit = {
      headers: {
         'Content-Type': 'application/json',
         Accept: 'application/json',
         'X-Client-Type': 'web',
      },
      credentials: 'include',
   };

   static async get<T>(path: string): Promise<{ data: T; headers: Headers }> {
      return this.request<T>(path, { method: 'GET' });
   }

   static async post<T, B>(path: string, body: B): Promise<{ data: T; headers: Headers }> {
      return this.request<T>(path, { method: 'POST', body: JSON.stringify(body) });
   }

   private static async request<T>(
      path: string,
      options: RequestInit
   ): Promise<{ data: T; headers: Headers }> {
      const requestHeaders = new Headers({
         ...this.defaultOptions.headers,
         ...options.headers,
      });
      if (typeof window === 'undefined') {
         try {
            const { cookies } = await import('next/headers');
            const cookieStore = await cookies();
            const cookieString = cookieStore.toString();
            if (cookieString) {
               requestHeaders.set('Cookie', cookieString);
            }
         } catch (error) {}
      }
      const response = await fetch(`${this.baseUrl}${path}`, {
         ...this.defaultOptions,
         ...options,
         headers: requestHeaders,
      });

      if (!response.ok) {
         let errorData: any;
         try {
            errorData = await response.json();
         } catch (parseError) {
            console.error(
               `[ApiClient] Failed to parse error response JSON from ${path}. Status: ${response.status}`
            );
            throw new Error(`Request failed with status ${response.status}`);
         }
         console.error(
            `[ApiClient] Request failed: ${path}, Status: ${response.status}, Error data:`,
            errorData
         );
         throw ApiError.fromMap(errorData);
      }

      let data: T;
      try {
         data = await response.json();
      } catch (parseError) {
         console.error(
            `[ApiClient] Failed to parse success response JSON from ${path}. Status: ${response.status}`
         );
         throw new Error(`Failed to parse success JSON from ${path}`);
      }
      // Return both the data and the headers back to the AuthService layer
      return { data, headers: response.headers };
   }
}
