"use client"
import FullPageSkeleton from "@/components/FullPageSkeleton";
import React, { createContext, useContext, useEffect, useState } from "react";

// You may need to update this endpoint to your actual user API endpoint.
const USER_API_ENDPOINT = "/api/users/me";

// Create context
const AuthContext = createContext(null);

// Context consumer hook
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user only on initial load
    async function fetchUser() {
      try {
        const response = await fetch(USER_API_ENDPOINT, {
          credentials: "include", // If cookies/session are used
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.message);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
//     setTimeout(()=>
//     {
//  setLoading(false)
//     },2000)
  }, []);

  // Loading state (show a loading spinner, skeleton, etc., if you like)
  if (loading) {
    return <FullPageSkeleton/>;
  }

  return (
    <AuthContext.Provider value={{user,loading}}>
      {children}
    </AuthContext.Provider>
  );
}
