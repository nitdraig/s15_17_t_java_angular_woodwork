import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { UserI } from "../types/Types";
import axios from "axios";
import { Workspace } from '../types/Types';
import { WorkspaceDetail } from '../types/Types';

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  user: UserI | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<void>;
  logout: () => void;
  getUserData: (idUser: string, token: string) => Promise<void>;
  updateUserData: (updatedUser: UserI, IDUser: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = "https://woodwork.onrender.com/v1/api";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<UserI | null>(null);
  const isAuthenticated = !!token;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedIdUser = localStorage.getItem("idUser");
    if (storedToken && storedIdUser) {
      setToken(storedToken);
      getUserData(storedIdUser, storedToken);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("Failed to login");
      }
      const data = await response.json();
      const accessToken = data?.token;
      const idUser = data?.id_user;

      if (!accessToken) {
        throw new Error("Access token not found in response");
      }
      setToken(accessToken);
      localStorage.setItem("token", accessToken);
      localStorage.setItem("idUser", idUser);
      await getUserData(idUser, accessToken);
    } catch (error) {
      console.error("Failed to login", error);
      throw error;
    }
  };

  const register = async (
    email: string,
    password: string,
    fullName: string
  ) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, fullName }),
      });
      if (!response.ok) {
        throw new Error("Failed to register");
      }
    } catch (error) {
      console.error("Failed to register", error);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("idUser");
  };

  const getUserData = async (idUser: string, token: string) => {
    try {
      const response = await fetch(`${API_URL}/user/getUserById/${idUser}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: UserI = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  const updateUserData = async (updatedUser: UserI, IDUser: number) => {
    try {
      const response = await fetch(`${API_URL}/user/updateUser/${IDUser}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
      });
      if (!response.ok) {
        throw new Error("Failed to update user data");
      }
      const data: UserI = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Failed to update user data", error);
      throw error;
    }
  };

  const contextValue: AuthContextType = {
    token,
    isAuthenticated,
    user,
    login,
    register,
    logout,
    getUserData,
    updateUserData,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export default useAuth;

// Obtener workspaces.
export const fetchWorkspaces = async (): Promise<Workspace[]> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const response = await axios.get(`${API_URL}/workspace/listOfWorkspaces`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Obtener detalles de un workspace.
export const fetchWorkspaceById = async (id: number): Promise<WorkspaceDetail> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const response = await axios.get(`${API_URL}/workspace/getWorkspaceById/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};