// src/utils/apiClient.ts
import { useAuth } from '../context/AuthContext';

export const useApiClient = () => {
  const { getAuthToken } = useAuth();

  const get = async (url: string) => {
    const token = getAuthToken();
    const response = await fetch(`http://localhost:16000${url}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return handleResponse(response);
  };

  const post = async (url: string, body: any, isFormData = false) => {
    const token = getAuthToken();
    
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${token}`
    };
    
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`http://localhost:16000${url}`, {
      method: 'POST',
      headers,
      body: isFormData ? body : JSON.stringify(body)
    });
    
    return handleResponse(response);
  };

  const handleResponse = async (response: Response) => {
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Request failed');
    }
    return response.json();
  };

  return { get, post };
};