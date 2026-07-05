import { t } from "elysia";

export const LoginBody = t.Object({
  email: t.String({ format: "email" }),
  password: t.String({ minLength: 8 }),
});

export const RefreshBody = t.Object({
  refreshToken: t.String(),
});

export interface AuthResult {
  accessToken: string;
  refreshToken: string;
  admin: { id: string; email: string; name: string };
}
