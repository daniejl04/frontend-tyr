export interface RegisterPayload {
  email: string;
  username: string;
  lastname: string;
  password: string;
  phone: {
    countryCode: string;
    phoneNumber: string;
  };
  country: string;
  city: string;
  photoUrl: string;
  role: string;
}

export interface RegisterSuccessResponse {
  message: string;
  email: string;
  role: string;
}

export interface VerifyOtpPayload {
  email: string;
  code: string;
}

/** Respuesta cruda del backend (incluye tokens). */
export interface VerifyOtpBackendResponse {
  message: string;
  userId: string;
  email: string;
  username: string;
  role: string;
  permissions: string[];
  access_token: string;
  refresh_token: string;
}

export interface VerifyOtpPublicResponse {
  ok: true;
  message: string;
  user: {
    userId: string;
    email: string;
    username: string;
    role: string;
    permissions: string[];
  };
}
