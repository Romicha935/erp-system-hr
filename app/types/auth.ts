export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "hr_manager" | "employee";
  avatarUrl?: string;
  department?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface LoginPayload {
  email: string;
  password?: string;
  rememberMe?: boolean;
}

export interface TwoFactorPayload {
  email: string;
  code: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  token: string;
  newPassword?: string;
  confirmPassword?: string;
}