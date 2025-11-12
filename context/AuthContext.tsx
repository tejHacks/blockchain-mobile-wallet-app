import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  resetPassword: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          console.log("User restored from AsyncStorage:", storedUser);
        }
      } catch (err) {
        console.log("Error loading user:", err);
      }
    };
    loadUser();
  }, []);

  const register = async (email: string, password: string) => {
    try {
      console.log("Registering user:", email);
      const users = JSON.parse((await AsyncStorage.getItem("users")) || "[]");

      const existingUser = users.find((u: any) => u.email === email);
      if (existingUser) throw new Error("User already exists");

      const newUser = { email, password };
      users.push(newUser);

      await AsyncStorage.setItem("users", JSON.stringify(users));
      await AsyncStorage.setItem("user", JSON.stringify(newUser));

      setUser(newUser);
      console.log("User registered and logged in:", newUser);
    } catch (err) {
      console.log("Register error:", err);
      throw err;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      console.log("Attempting login:", email);
      const users = JSON.parse((await AsyncStorage.getItem("users")) || "[]");
      const foundUser = users.find((u: any) => u.email === email && u.password === password);

      if (!foundUser) throw new Error("Invalid email or password");

      await AsyncStorage.setItem("user", JSON.stringify(foundUser));
      setUser(foundUser);
      console.log("User logged in:", foundUser);
    } catch (err) {
      console.log("Login error:", err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      console.log("Logging out...");
      await AsyncStorage.removeItem("user");
      setUser(null);
      console.log("Logout successful");
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      console.log("Password reset requested for:", email);
      const users = JSON.parse((await AsyncStorage.getItem("users")) || "[]");
      const user = users.find((u: any) => u.email === email);
      if (!user) throw new Error("No user found with this email");
      console.log("Mock reset link sent (not actually sent in dev mode)");
    } catch (err) {
      console.log("Reset password error:", err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
