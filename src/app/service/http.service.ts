import axios, {type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';

class HttpService {
  private api: AxiosInstance;
  private static instance: HttpService;

  private constructor() {
    this.api = axios.create({
      baseURL: process.env.VITE_EVENTLY_URL || 'http://localhost:3005/api/v1/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Intercepteur pour les requêtes
    this.api.interceptors.request.use(
      (config) => {
        // Récupération du token depuis le localStorage
        const token = localStorage.getItem('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token || ""}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Intercepteur pour les réponses
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Gestion du rafraîchissement du token
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await this.api.post('/auth/refresh', { refreshToken });
            const { token } = response.data;
            
            localStorage.setItem('accessToken', token);
            originalRequest.headers.Authorization = `Bearer ${token}`;
            
            return this.api(originalRequest);
          } catch (refreshError) {
            // Redirection vers la page de connexion en cas d'échec
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  public static getInstance(): HttpService {
    if (!HttpService.instance) {
      HttpService.instance = new HttpService();
    }
    return HttpService.instance;
  }

  // Méthodes génériques pour les requêtes HTTP
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const response: AxiosResponse<T> = await this.api.get(url, config);
    return response;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const response: AxiosResponse<T> = await this.api.post(url, data, config);
    return response;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const response: AxiosResponse<T> = await this.api.put(url, data, config);
    return response;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.delete(url, config);
    return response.data;
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.patch(url, data, config);
    return response.data;
  }

  // Méthode pour gérer les erreurs
  private handleError(error: any): never {
    if (error.response) {
      // Erreur de réponse du serveur
      console.error('Response error:', error.response.data);
      throw new Error(error.response.data.message || 'Une erreur est survenue');
    } else if (error.request) {
      // Erreur de requête
      console.error('Request error:', error.request);
      throw new Error('Impossible de contacter le serveur');
    } else {
      // Autre erreur
      console.error('Error:', error.message);
      throw new Error(error.message);
    }
  }
}

export default HttpService.getInstance();