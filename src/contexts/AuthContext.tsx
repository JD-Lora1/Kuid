
import { add } from 'date-fns';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  isNewUser: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, lastname: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for saved user in local storage
    const savedUser = localStorage.getItem('kuid_user');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.status === 401) {
        throw new Error('Credenciales incorrectas');
      }
      if (!response.ok) {
        throw new Error('Error desconocido en el login');
      }
      
      const data = await response.json();

      console.log(data);

      const loggedUser = {
        id: data.id,
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        isNewUser: false,
      };

      setUser(loggedUser);
      
      localStorage.setItem('kuid_user', JSON.stringify(loggedUser));
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, lastname: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          lastname,
          email,
          cellphone: 'Sin Número',
          address: 'Dirección no asociada',
          birth_date: '1990-01-01',
          password,
        }),
      })

      if (!response.ok) {
        throw new Error('Error en el registro');
      }

      const data = await response.json();

      const newUser = {
        id: data.id,
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        isNewUser: true,
      };
      
      setUser(newUser);

      localStorage.setItem('kuid_user', JSON.stringify(newUser));

      navigate('/onboarding/configure-insurance');
    } catch (error) {
      console.error('Registration failed:', error);

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kuid_user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
