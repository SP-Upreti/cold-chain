"use client";

import { useState, useEffect } from "react";
import { UserRole, IUser } from "@/types/IUser";

// TODO: Replace with actual authentication logic
export function useAuth() {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated auth check - replace with your actual auth implementation
    const checkAuth = async () => {
      try {
        // Example: const response = await fetch('/api/auth/me');
        // const userData = await response.json();
        // setUser(userData);
        
        // For demo purposes, setting as SUDOADMIN
        setUser({
          id: "demo-user-id",
          email: "admin@example.com",
          name: "Admin User",
          role: UserRole.SUDOADMIN,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Auth check failed:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const isSudoAdmin = user?.role === UserRole.SUDOADMIN;
  const isAdmin = user?.role === UserRole.ADMIN || isSudoAdmin;

  return {
    user,
    loading,
    isSudoAdmin,
    isAdmin,
    isAuthenticated: !!user,
  };
}
