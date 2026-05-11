import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const { token: t, user: u } = await authService.me();
      setUser(u);
      setToken(t || "");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = useCallback(async (payload) => {
    const res = await authService.login(payload);
    setUser(res.user);
    setToken(res.token);
    toast.success("Welcome back!");
    return res;
  }, []);

  const register = useCallback(async (payload) => {
    const res = await authService.register(payload);
    setUser(res.user);
    setToken(res.token);
    toast.success("Account created!");
    return res;
  }, []);

  const forgotPassword = useCallback(async (payload) => {
    const res = await authService.forgotPassword(payload);
    toast.success("Reset email sent (mock)!");
    return res;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
    setToken("");
    toast("Signed out");
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      loading,
      login,
      register,
      forgotPassword,
      logout,
      refresh,
    }),
    [user, token, loading, login, register, forgotPassword, logout, refresh],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;

