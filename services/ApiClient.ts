import { ApiError } from './ApiError';

export default class ApiClient {
   private static readonly baseUrl: string = '/api';
   private static isLoggingOut = false;

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

   static async put<T, B>(path: string, body: B): Promise<{ data: T; headers: Headers }> {
      return this.request<T>(path, { method: 'PUT', body: JSON.stringify(body) });
   }

   static async delete(path: string): Promise<{ data: null; headers: Headers }> {
      return this.request<null>(path, { method: 'DELETE' });
   }

   private static async handleSessionExpired() {
      if (this.isLoggingOut) return;
      this.isLoggingOut = true;
      try {
         await fetch(`${this.baseUrl}/auth/logout`, {
            method: 'POST',
            headers: { 'X-Client-Type': 'web' },
            credentials: 'include',
         });
      } catch {
         // Best-effort — cookies will expire on their own
      }
      window.location.href = '/login';
   }

   private static async request<T>(path: string, options: RequestInit): Promise<{ data: T; headers: Headers }> {
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

      if (response.status === 401 && typeof window !== 'undefined') {
         this.handleSessionExpired();
         throw new ApiError('Unauthorized', 'Session expired', new Date().toISOString());
      }

      if (!response.ok) {
         let errorData: any;
         try {
            errorData = await response.json();
         } catch (parseError) {
            console.error(`[ApiClient] Failed to parse error response JSON from ${path}. Status: ${response.status}`);
            throw new Error(`Request failed with status ${response.status}`);
         }
         console.error(`[ApiClient] Request failed: ${path}, Status: ${response.status}, Error data:`, errorData);
         throw ApiError.fromMap(errorData);
      }

      const contentType = response.headers.get('content-type') || '';
      let data: T;
      if (contentType.includes('application/json')) {
         try {
            data = await response.json();
         } catch (parseError) {
            console.error(`[ApiClient] Failed to parse success response JSON from ${path}. Status: ${response.status}`);
            throw new Error(`Failed to parse success JSON from ${path}`);
         }
      } else {
         data = undefined as T;
      }
      return { data, headers: response.headers };
   }
}
