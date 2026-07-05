export interface LordAdmin {
  id: string;
  email: string;
  password: string; // hash bcrypt — JANGAN PERNAH dikirim ke frontend
  name: string;
  createdAt: string;
}

export interface AuthTokenPayload {
  sub: string; // lord_admin id
  type: "access" | "refresh";
}
