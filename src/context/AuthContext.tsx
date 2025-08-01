import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  email: string;
  name: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  getAuthToken: () => string | null;
  loading: boolean; // Add loading state
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Track initial loading state
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = localStorage.getItem('user');
      
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          
          // Optional: Validate token with backend on refresh
          try {
            const response = await fetch('http://localhost:16000/loggedIn', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${parsedUser.token}`,
                'Content-Type': 'application/json',
              },
            });
            
            if (response.ok) {
              setUser(parsedUser);
            } else {
              localStorage.removeItem('user');
            }
          } catch (error) {
            console.error('Token validation failed:', error);
            localStorage.removeItem('user');
          }
        } catch (error) {
          console.error('Failed to parse user data:', error);
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:16000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      
      if (!data.token) {
        throw new Error('No token received');
      }

      const userWithToken = { 
        id: data.user.id, 
        email: data.user.email, 
        name: data.user.username, 
        token: data.token 
      };

      setUser(userWithToken);
      localStorage.setItem('user', JSON.stringify(userWithToken));
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getAuthToken = () => {
    return user?.token || null;
  };

  const isAuthenticated = !!user;

  // Don't render children until auth state is initialized
  if (loading) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated,
      getAuthToken,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};