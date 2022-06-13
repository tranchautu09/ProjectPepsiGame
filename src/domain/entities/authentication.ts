export interface SignInResult {}

export interface SignUpResult {
  note?: string;
  success: boolean;
  data: any;
}

export interface Credential {
  phone_number: string;
  name?: string;
}

export interface RequestOtpResult {
  otp_confirmation: any;
}

export interface VerifyOtpResult {
  success: boolean;
  note?: string;
}

export interface VerifyOtpPayload {
  otp: string;
  confirm: any;
}

export interface SignOutResult {
  success: boolean;
  note?: string;
}
