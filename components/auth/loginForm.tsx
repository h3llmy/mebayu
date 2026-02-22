"use client";

import { ChangeEvent, SubmitEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { Input } from "@/components/input/input";
import { Button } from "@/components/button/button";
import { api } from "@/lib/apiFetch/apiFetch";
import Cookies from "js-cookie";

export const LoginForm = () => {
  const t = useTranslations("Pages.Login");
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post("/v1/auth/login", { username, password });

      const data = response.data;

      // Save tokens in cookies only
      const { access_token, refresh_token, accessToken, refreshToken } = data;
      const access = access_token || accessToken;
      const refresh = refresh_token || refreshToken;

      if (access) {
        Cookies.set("access_token", access, { expires: 1, path: "/", sameSite: "lax" });
      }

      if (refresh) {
        Cookies.set("refresh_token", refresh, { expires: 7, path: "/", sameSite: "lax" });
      }

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      setError(t("error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Input
          label={t("username")}
          type="text"
          placeholder="username"
          value={username}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          required
          autoComplete="username"
        />
        <Input
          label={t("password")}
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
      </div>

      {error && (
        <div className="text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 cursor-pointer text-gray-600">
          <input type="checkbox" className="rounded border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)]/20" />
          Keep me logged in
        </label>
        <button type="button" className="text-[var(--primary)] hover:underline font-medium">
          {t("forgotPassword")}
        </button>
      </div>

      <Button type="submit" isLoading={isLoading} className="w-full">
        {t("login")}
      </Button>

      <p className="text-sm text-gray-500 text-center">
        {t("noAccount")}
      </p>
    </form>
  );
};
