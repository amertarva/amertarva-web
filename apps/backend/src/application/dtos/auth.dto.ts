import { t } from "elysia";

export const LoginBody = t.Object({
  email: t.String({ format: "email" }),
  password: t.String({ minLength: 8 }),
});

export const RefreshBody = t.Object({
  refreshToken: t.String(),
});

export const UpdateProfileBody = t.Object({
  name: t.Optional(t.String({ minLength: 2 })),
  email: t.Optional(t.String({ format: "email" })),
});

export const UpdatePasswordBody = t.Object({
  currentPassword: t.String({ minLength: 1 }),
  newPassword: t.String({ minLength: 8 }),
});

export interface AuthResult {
  accessToken: string;
  refreshToken: string;
  admin: { id: string; email: string; name: string };
}
